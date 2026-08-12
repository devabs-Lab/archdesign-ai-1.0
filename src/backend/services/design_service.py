from src.ai_crew.crew import run_crew
from src.backend.schemas.design_schema import ChatMessage


GREETING_WORDS = {
    "ahlan",
    "bonjour",
    "good day",
    "hi",
    "hi there",
    "hiya",
    "hello",
    "hello there",
    "hey there",
    "hey",
    "hey man",
    "hey bro",
    "hey buddy",
    "howdy",
    "hola",
    "morning",
    "evening",
    "good morning",
    "good afternoon",
    "good evening",
    "greetings",
    "salam",
    "selam",
    "sup",
    "whatsapp",
    "wassup",
    "wazzup",
    "what up",
    "whats up",
    "what's up",
    "yo",
    "yo bro",
}

DESIGN_WORDS = {
    "architecture",
    "architect",
    "architectural",
    "design",
    "database",
    "backend",
    "frontend",
    "api",
    "microservice",
    "microservices",
    "scalable",
    "scale",
    "system",
    "schema",
    "requirements",
    "workflow",
    "cloud",
    "deploy",
    "service",
    "queue",
    "cache",
    "auth",
    "authentication",
    "authorization",
    "login",
    "user",
    "users",
    "security",
    "payment",
    "payments",
    "notification",
    "notifications",
    "hosting",
    "server",
    "storage",
}

FOLLOW_UP_WORDS = {
    "it",
    "that",
    "this",
    "those",
    "they",
    "them",
    "there",
    "above",
    "same",
    "also",
}

CAPABILITY_WORDS = {
    "speciality",
    "specialty",
    "specialities",
    "specialties",
    "capability",
    "capabilities",
    "expertise",
    "good at",
    "help with",
    "what kind",
    "what type",
    "what can",
}

PREFERENCE_WORDS = {
    "no need to say hello",
    "don't say hello",
    "do not say hello",
    "stop saying hello",
    "no repeated greetings",
}

ANSWER_EARLIER_WORDS = {
    "answer what i said",
    "answer to what i said",
    "answer my question",
    "answer my question first",
    "first answer",
}

CASUAL_WORDS = {
    "what up",
    "whats up",
    "what's up",
    "sup",
    "yo",
}

CASUAL_TOPIC_WORDS = {
    "coffee",
    "tea",
    "music",
    "movies",
    "food",
    "sports",
}

CLARIFICATION_WORDS = {
    "what do you mean",
    "what you mean",
    "explain",
}

GREETING_CORRECTION_WORDS = {
    "means hi",
    "i mean hi",
    "it means hi",
}

WELLBEING_WORDS = {
    "are you fine",
    "are you okay",
    "are you ok",
    "how are you",
    "how you doing",
    "how are you doing",
}

SHORT_UNCLEAR_WORDS = {
    "what",
    "huh",
    "why",
    "ok",
    "okay",
    "yes",
    "no",
}

FRUSTRATION_WORDS = {
    "dumb",
    "stupid",
    "wtf",
    "wrong",
    "not giving",
}


def _is_capability_question(text: str) -> bool:
    return any(phrase in text for phrase in CAPABILITY_WORDS) and (
        "design" in text or "system" in text or "you" in text
    )


def _is_preference_or_correction(text: str) -> bool:
    return any(phrase in text for phrase in PREFERENCE_WORDS | ANSWER_EARLIER_WORDS)


def _is_frustrated_message(text: str) -> bool:
    return any(word in text for word in FRUSTRATION_WORDS)


def _asks_to_answer_earlier(text: str) -> bool:
    return any(phrase in text for phrase in ANSWER_EARLIER_WORDS)


def _latest_unanswered_capability_question(history: list[ChatMessage]) -> str | None:
    for message in reversed(history):
        if message.role == "user" and _is_capability_question(message.content.lower()):
            return message.content
    return None


def _capability_response() -> str:
    return (
        "My strongest system design areas are architecture planning, API design, "
        "database/schema design, scalability, caching, queues, authentication, "
        "deployment, cloud infrastructure, microservices, and trade-off analysis. "
        "I can help turn a rough idea into a clear architecture, choose technologies, "
        "break the system into services, and explain why each part is needed."
    )


def _has_design_context(history: list[ChatMessage]) -> bool:
    recent_text = " ".join(
        message.content.lower()
        for message in history[-6:]
        if message.role == "user"
    )
    return any(word in recent_text for word in DESIGN_WORDS)


def _is_casual_message(text: str) -> bool:
    return (
        text in CASUAL_WORDS
        or text in WELLBEING_WORDS
        or "let's talk" in text
        or "lets talk" in text
        or "talk about" in text
        or any(word in text for word in CASUAL_TOPIC_WORDS)
    )


def _is_greeting_message(text: str) -> bool:
    if text in GREETING_WORDS or text in GREETING_CORRECTION_WORDS:
        return True

    words = text.split()
    greeting_starts = {
        "hi",
        "hello",
        "hey",
        "salam",
        "selam",
        "yo",
        "hola",
        "bonjour",
        "howdy",
        "greetings",
    }
    return len(words) <= 4 and words[0] in greeting_starts


def _is_short_unclear_message(text: str) -> bool:
    return text in SHORT_UNCLEAR_WORDS or len(text.split()) <= 2


def _general_response(text: str, history: list[ChatMessage]) -> str:
    if text in WELLBEING_WORDS:
        return "I'm doing well, thanks for asking. How are you?"

    if "school" in text:
        return "Are you saying you have school today, or are you asking if you have school today?"

    if text == "improve":
        return "What do you want to improve?"

    if "don't need that" in text or "dont need that" in text or "don't want" in text:
        return "Got it. What do you need instead?"

    if text.startswith("no "):
        return "Sure. What do you want to talk about?"

    if _is_frustrated_message(text):
        return "You're right, that response missed what you were asking. What did you want me to answer?"

    if history:
        return "Tell me what you mean and I’ll answer directly."

    return "What would you like to talk about?"


def _latest_user_question(history: list[ChatMessage]) -> str | None:
    for message in reversed(history):
        content = message.content.strip()
        normalized = content.lower().rstrip("!.? ")
        if message.role == "user" and (content.endswith("?") or normalized in WELLBEING_WORDS):
            return content
    return None


def _direct_answer_to_question(question: str) -> str:
    normalized = question.lower().strip().rstrip("!.? ")

    if normalized in WELLBEING_WORDS:
        return "I'm doing well, thanks for asking. How are you?"

    if _is_capability_question(normalized):
        return _capability_response()

    return "You're right. Ask it again clearly and I'll answer it directly."


def _casual_response(text: str) -> str:
    normalized = text.lower().strip().rstrip("!.? ")

    if normalized in WELLBEING_WORDS:
        return "I'm doing well, thanks for asking. How are you?"

    if "coffee" in normalized:
        return "Sure, coffee is a good topic. Do you like strong coffee, sweet coffee, or something simple like a latte?"

    if "tea" in normalized:
        return "Sure, tea works too. Are we talking black tea, green tea, spiced tea, or just a chill cup?"

    if "music" in normalized:
        return "Sure, let's talk music. What kind of music do you usually listen to?"

    if "movies" in normalized:
        return "Sure, let's talk movies. Are you into action, comedy, drama, sci-fi, or something else?"

    if "food" in normalized:
        return "Sure, food is always a solid topic. What kind of food do you like?"

    if "sports" in normalized:
        return "Sure, let's talk sports. Which sport or team do you follow?"

    if "let's talk" in normalized or "lets talk" in normalized or "talk about" in normalized:
        return "Sure, let's talk. What topic do you want to start with?"

    return "Not much. What's up?"


def _is_contextual_follow_up(requirement: str) -> bool:
    words = set(requirement.strip().lower().rstrip("!.? ").split())
    return len(words) <= 12 and bool(words & FOLLOW_UP_WORDS)


def _classify_message(requirement: str, history: list[ChatMessage] | None = None) -> str:
    text = requirement.strip().lower()
    normalized = text.rstrip("!.? ")
    history = history or []

    if not normalized:
        return "empty"

    if normalized.startswith(("what is ", "what are ", "what's ")):
        return "general"

    if _is_frustrated_message(normalized):
        return "general"

    if _is_preference_or_correction(normalized):
        return "preference"

    if _is_capability_question(normalized):
        return "capability"

    if _is_greeting_message(normalized):
        return "greeting"

    if normalized in CLARIFICATION_WORDS:
        return "clarification"

    if _is_casual_message(normalized):
        return "casual"

    if any(word in normalized for word in DESIGN_WORDS):
        return "design"

    if _has_design_context(history) and _is_contextual_follow_up(normalized):
        return "design"

    if normalized == "improve":
        return "general"

    if _is_short_unclear_message(normalized):
        return "unclear"

    return "general"


def _format_history(history: list[ChatMessage]) -> str:
    if not history:
        return "No previous conversation."

    recent_messages = history[-8:]
    return "\n".join(
        f"{message.role.title()}: {message.content.strip()}"
        for message in recent_messages
        if message.content.strip()
    )


def _build_contextual_requirement(requirement: str, history: list[ChatMessage]) -> str:
    return f"""
Conversation so far:
{_format_history(history)}

Latest user message:
{requirement}

Answer the latest user message using the conversation so far for context.
""".strip()


def _clean_model_output(output: str) -> str:
    lines = []
    for line in output.splitlines():
        stripped = line.strip()
        if stripped and set(stripped) <= {"*"}:
            continue
        lines.append(line.replace("*", ""))

    return "\n".join(lines).strip()


def generate_design_service(requirement: str, history: list[ChatMessage] | None = None) -> dict:
    try:
        history = history or []
        message_type = _classify_message(requirement, history)

        if message_type == "greeting":
            has_prior_assistant_reply = any(message.role == "assistant" for message in history)
            if has_prior_assistant_reply:
                return {"message": "Hey, what's up?"}
            return {"message": "Hi! How can I help you with your system design today?"}

        if message_type == "casual":
            return {"message": _casual_response(requirement)}

        if message_type == "unclear":
            return {"message": "Can you clarify what you mean?"}

        if message_type == "clarification":
            return {
                "message": (
                    "I meant that I needed a little more detail to answer well. "
                    "For example, you can ask me about system architecture, API design, "
                    "databases, scaling, deployment, or frontend/backend structure."
                )
            }

        if message_type == "empty":
            return {"message": "Please send a requirement or question, and I will help from there."}

        if message_type == "capability":
            return {"message": _capability_response()}

        if message_type == "preference":
            previous_capability_question = _latest_unanswered_capability_question(history)
            if previous_capability_question and _asks_to_answer_earlier(requirement.lower()):
                return {
                    "message": (
                        "You're right. To answer your earlier question:\n\n"
                        f"{_capability_response()}"
                    )
                }

            previous_question = _latest_user_question(history)
            if previous_question and _asks_to_answer_earlier(requirement.lower()):
                return {"message": _direct_answer_to_question(previous_question)}

            return {
                "message": (
                    "Understood. No repeated greetings. Replies will stay direct and focused "
                    "on the user's question."
                )
            }

        if message_type == "general":
            return {
                "message": (
                    "I'm mainly built to help with software and system design. Ask me about "
                    "architecture, APIs, databases, scaling, deployment, or backend/frontend design."
                )
            }

        result = run_crew(_build_contextual_requirement(requirement, history))
        return {"message": _clean_model_output(str(result))}
    except Exception as e:
        return {"error": str(e)}
