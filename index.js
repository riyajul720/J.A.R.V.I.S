function json(data, status = 200) {
  return Response.json(data, {
    status,
    headers: { "Cache-Control": "no-store" }
  });
}

export default {
  async fetch(request, env) {
    if (request.method !== "POST") {
      return json({ error: "POST required." }, 405);
    }

    // Reject requests without the private access key.
    const expected = env.JARVIS_ACCESS_KEY;
    const supplied = request.headers.get("Authorization") || "";

    if (
      !expected ||
      supplied !== `Bearer ${expected}`
    ) {
      return json({ error: "Unauthorized." }, 401);
    }

    let body;

    try {
      body = await request.json();
    } catch {
      return json({ error: "Invalid JSON." }, 400);
    }

    if (
      typeof body.message !== "string" ||
      !body.message.trim()
    ) {
      return json({ error: "Message required." }, 400);
    }

    if (body.message.length > 4000) {
      return json({ error: "Message too long." }, 413);
    }

    return json({
      agent: "J.A.R.V.I.S.",
      status: "backend_ready",
      glm_connected: false,
      message: "Private access verified. GLM is not connected yet."
    });
  }
};
  
