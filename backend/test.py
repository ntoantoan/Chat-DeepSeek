from openai import OpenAI
client = OpenAI(
    base_url="https://7929-14-162-135-247.ngrok-free.app/v1",
    api_key="token-abc123",
)

completion = client.chat.completions.create(
  model="deepseek-ai/DeepSeek-R1-Distill-Qwen-1.5B",
  messages=[
    {"role": "user", "content": "hãy nói chào tôi"}
  ]
)

print(completion.choices[0].message.content)