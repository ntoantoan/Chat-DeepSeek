vllm serve deepseek-ai/DeepSeek-R1-Distill-Qwen-1.5B \
    --enable-reasoning --reasoning-parser deepseek_r1 --kv-cache-dtype fp8 --kv-cache-dtype fp8