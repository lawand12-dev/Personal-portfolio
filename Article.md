Why smart AI models still write like bots

A model can solve a hard coding problem and then fail to write four plain paragraphs. It explains every step, adds a tidy list, and says very little.

People miss this gap when they treat intelligence as one score. Models have improved at math, coding, and multi-step reasoning, but their writing often still reads as generic, too long, or oddly formal. Getting better at one skill doesn’t make a model better at another.

Some skills have an answer key

A math problem has a correct answer. Code can be run against tests. The checks are imperfect, but they tell a model whether an attempt passed or failed, so it can be trained through many rounds of trial and error. OpenAI said it trained o1 this way, using reinforcement learning to improve reasoning. DeepSeek-R1 used rule-based rewards on math, coding, and logic tasks, and its open weights let people run that approach locally. (OpenAI on o1, DeepSeek-R1 in Nature)

Writing has no answer key. There are many ways to explain an idea, and readers disagree about which is best. A reward system can check that an answer is correct. It can’t easily check that a paragraph is graceful, memorable, or sounds like a particular person.

So a model can get better at tasks with clear feedback while its writing stays flat, or gets worse in some releases. It probably hasn’t lost the ability to write. The people training it are putting their effort elsewhere.

The builders have noticed

In January 2026, Sam Altman was asked why ChatGPT 5.2 was harder to read than GPT-4.5. He said, “I think we just screwed that up.” OpenAI had focused on intelligence, reasoning, coding, and engineering, he explained, and “sometimes we focus on one thing and neglect another.” (Developer town hall; transcript and context)

That applies to one release. It doesn’t show that every new model writes worse than every old one. It does explain why someone might prefer an older model: the newer one can be better at what its developers prioritized and worse at what they neglected.

Jackson Kernion, a fine-tuning engineer at Anthropic, gave a more detailed reason why later Claude models could feel dense. He argued that training on math and code can reward explanations that other AI models process easily, even when human readers find them hard to follow. He called this adapting to “LLM psychology”: the model learns to write for systems that can track more detail than a person wants in a paragraph. The result, in his words, can be “overly-dense info dumps.” (Kernion’s post; The Decoder’s report)

Kernion’s account comes from an engineer, not a controlled study. It still points to a practical problem. If training rewards technical performance and machine-readable explanations, developers have to make readability for humans a separate goal.

Why the writing sounds the same

A system rewarded for being helpful, complete, and safe has good reason to pick familiar structures. It opens with a summary, covers both sides, adds a list, and ends with a neat conclusion. Readers recognize this as competent. It is also easy to repeat.

This is part of what people call AI slop. No single measure defines it. The term covers bland wording, needless length, recycled ideas, and content made so cheaply that nobody tried to make it good. As more people use these systems, their habits show up in places where readers expected a distinct voice.

Research covers one piece of this. A 2025 study found that AI-generated stories often reused plot elements across generations, while human-written stories were rarely echoed that way. That doesn’t prove every model writes badly. It shows that fluent writing can still draw from a narrow set of ideas. (Study in PNAS)

Why the usual fixes fall short

The first fix is a better prompt: “Be concise,” “avoid clichés,” “write like me.” Instructions like these help with tone and format. Personal style is harder to list. It sits in choices a writer may not be able to describe, such as what to notice, where to pause, and which detail to leave out.

A study of writing samples from more than 400 people found that models had trouble imitating the informal style of blogs and forums from a few examples. They did better with structured forms such as emails and news writing. A prompt can steer a model, but it doesn’t reliably give it a personal voice. (Wang et al., 2025)

The second fix is training on human preferences. This can improve responses, but if training rewards what people tend to agree is good, the model may settle on the safest shared style. Research on creative writing has found that common post-training methods can reduce output diversity. Researchers have also tested modified methods that keep more variety without losing much quality, so the problem is real but not inevitable. (Chung et al., 2025)

The third fix is fine-tuning on one writer’s work. It can work, and it would be wrong to say every attempt fails. In a 2026 study, expert judges preferred AI imitations over human ones more often after models were fine-tuned on authors’ complete works. But the test used famous authors and books. It shows what is possible, not that anyone can get a faithful writing model from a few pasted samples. (Chakrabarty and Dhillon, 2026)

Each fix has a limit. Prompts capture tacit style poorly. Generic preference training can reward the average. Fine-tuning needs enough good examples and careful evaluation. Banning a few familiar phrases removes symptoms and gives the model nothing new to say.

I think this can improve

Anthropic has tried to address part of this. Its September 2026 Opus 5.5 release said the model wrote more naturally than its predecessor, with clearer prose and key information near the start. Kernion said the release included targeted work on sentence clarity and dense explanations, and called the problem ongoing. That shows an attempt, not a solution. (Anthropic’s Opus 5.5 announcement, Kernion’s post)

The bigger point is that writing has to be a real training objective. A company that wants readable prose needs to evaluate it, with human readers, clear criteria, and room for different tastes. The model shouldn’t have to guess whether “good” means correct, concise, warm, persuasive, or recognizably the user’s own voice.

A model that reasons well can still write badly, and better math scores won’t fix that. Writing quality can be trained, and some fixes already work in narrow settings. The job now is to train models to communicate with people on purpose.

Editorial note: I treat “new models write worse” as a complaint about specific releases and tasks, not a universal fact. The evidence also doesn’t support saying every proposed fix has failed.
