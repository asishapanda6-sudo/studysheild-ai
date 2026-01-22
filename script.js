export default {
  async fetch(request, env) {
    // Allow only POST
    if (request.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405 });
    }

    try {
      const body = await request.json();
      const text = body.text;

      if (!text) {
        return new Response(
          JSON.stringify({ error: "No text provided" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }

      const hfResponse = await fetch(
        "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${env.HF_TOKEN}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            inputs: text,
            parameters: {
              max_length: 150,
              min_length: 60
            }
          })
        }
      );

      const result = await hfResponse.json();

      return new Response(JSON.stringify(result), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      });

    } catch (err) {
      return new Response(
        JSON.stringify({ error: "Worker error", details: err.message }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  }
};