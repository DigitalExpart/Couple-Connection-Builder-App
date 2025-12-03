import { useState } from 'react';
import { ArrowLeft, Send, Bot, Heart, Shield, MessageCircle, Sparkles } from 'lucide-react';
import { HomeButton } from '../HomeButton';

interface AICoachScreenProps {
  onBack: () => void;
  onNavigateHome?: () => void;
}

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface UserContext {
  name?: string;
  partnerName?: string;
  relationshipStatus?: 'single' | 'dating' | 'committed' | 'complicated';
  concerns: string[];
  topics: string[];
  previousQuestions: string[];
  mentionedIssues: string[];
}

const SUGGESTED_PROMPTS = [
  { icon: Heart, text: "How do I know if they're emotionally available?", category: 'emotional' },
  { icon: Shield, text: "What are common red flags I should watch for?", category: 'safety' },
  { icon: MessageCircle, text: "How can I improve communication?", category: 'communication' },
  { icon: Sparkles, text: "What questions should I ask on a first date?", category: 'dating' },
  { icon: Heart, text: "Am I ready for a committed relationship?", category: 'readiness' },
  { icon: Sparkles, text: "How does my past affect my present relationships?", category: 'past' },
];

const AI_RESPONSES: Record<string, string> = {
  'emotional': "Emotional availability is one of those things that's easier to feel than define, but research from attachment theory gives us some clear markers to look for.\n\nWhen someone is emotionally available, they'll openly share their feelings and experiences with you. They're comfortable with vulnerability - not in a performative way, but in a genuine 'I trust you with this' kind of way. You'll notice they ask about your emotions and actually validate them, rather than dismissing or minimizing how you feel.\n\nDr. John Gottman's research over 40 years shows that emotionally available partners maintain consistent communication and have processed their past relationships in a healthy way. The key red flag? Watch for inconsistency between their words and actions. Someone might say they're ready for connection, but if they keep emotional walls up or struggle to discuss feelings, that's your answer right there.",
  
  'safety': "Trust your gut on this one - if something feels off, it usually is. Dr. Ramani Durvasula's research on toxic relationships identifies several critical red flags that are worth paying attention to early.\n\nControlling behavior and excessive jealousy are major warning signs. This might start subtly - monitoring your phone, questioning where you've been, or getting upset when you spend time with friends. Disrespecting your boundaries is another big one. If you say no to something and they keep pushing, that's not persistence, that's disrespect.\n\nWatch for inconsistent stories or dishonesty, even about small things. Someone rushing intimacy or commitment before really knowing you is often trying to create dependency. And here's a research-backed insight from clinical psychologist Dr. Craig Malkin: people who speak poorly about ALL their exes without any self-reflection often have patterns they haven't addressed.\n\nMood swings, unpredictability, pressure, and manipulation - these aren't things that get better with time. They're foundational issues that require professional help to address.",
  
  'communication': "Healthy communication is truly the foundation of any strong relationship, and the research backs this up powerfully. Dr. John Gottman's famous 'Love Lab' studies found that he could predict with 94% accuracy which couples would divorce based on their communication patterns.\n\nThe most effective strategy is active listening without interrupting. It sounds simple, but studies show most people are formulating their response rather than truly hearing their partner. Try using 'I' statements to express feelings - 'I feel hurt when...' rather than 'You always...' This small shift reduces defensiveness by about 60% according to communication research.\n\nAsk open-ended questions that show genuine curiosity. Be honest but kind in your responses - research from Dr. Sue Johnson shows that emotional safety is created through hundreds of small moments of responsiveness. Address concerns early before they grow into resentment; the Gottman Institute found that the average couple waits six years to address problems that should be dealt with immediately.\n\nMake space for difficult conversations. Couples who can navigate conflict constructively actually become closer through disagreements. It's not about avoiding conflict - it's about handling it with respect and care.",
  
  'dating': "First dates are really about curiosity and connection, not interrogation. Psychology research shows that people form impressions in the first 7 minutes, but deeper compatibility takes genuine conversation to uncover.\n\nStart with questions that invite storytelling: 'What do you love spending time doing?' tells you far more than their job title ever will. Follow up with 'What's something you're passionate about?' - passion reveals values. Ask how they typically spend their weekends to understand their lifestyle and priorities.\n\nHere's where it gets important: 'What kind of relationship are you looking for?' Early alignment on this saves everyone heartache. Dr. Helen Fisher's research on attachment and dating shows that people who discuss relationship intentions early have 40% more successful outcomes.\n\n'How do you handle stress or difficult times?' is crucial - you're not just learning about their coping mechanisms, you're seeing emotional maturity. 'What do you value most in relationships?' and 'What are your long-term goals?' might feel heavy for a first date, but they're actually generous questions that show you care about compatibility, not just chemistry.\n\nHere's the secret though: listen carefully to both their answers AND how they engage with your questions. Do they ask follow-ups? Do they show curiosity about you? Research from relationship expert Dr. Terri Orbuch found that happy couples have deep, meaningful conversations regularly. Start as you mean to continue.",
  
  'readiness': "Being ready for a committed relationship isn't about being perfect - it's about being open, self-aware, and willing to do the work. Dr. Stan Tatkin's research on couple neurobiology shows that successful relationships require both partners to be in a place of emotional readiness.\n\nYou've healed from past relationships when you can talk about them without intense emotion - not coldness, but perspective. You know what you want and need, and crucially, you can articulate those things. Emotional availability and stability mean you're not using a relationship to fix something broken inside you; you're adding to an already whole life.\n\nBeing vulnerable and authentic requires a level of self-acceptance that only comes from inner work. The willingness to compromise and grow is essential - research shows that flexibility in relationships correlates with long-term satisfaction more than initial compatibility.\n\nYou have realistic expectations, not fairy-tale ones. Dr. Eli Finkel's research on marriage expectations found that unrealistic ideals are one of the biggest predictors of relationship failure. And perhaps most importantly, you're content with yourself first. As psychologist Dr. Diana Kirschner puts it, you should be looking for someone to share your life with, not complete it.\n\nRemember: being ready doesn't mean being perfect. It means being open, self-aware, and willing to show up authentically.",
  
  'past': "Your past shapes your present relationships in powerful ways - this isn't just intuition, it's backed by decades of attachment research from Dr. Mary Ainsworth and Dr. John Bowlby.\n\nUnhealed wounds create defensive patterns that feel protective but actually push people away. Past trauma may trigger present fears in ways that seem irrational to others but make perfect sense to your nervous system. Old relationship dynamics can repeat because they're familiar, even when they're painful. Childhood attachment styles - formed in your first relationships - profoundly influence how you bond as an adult.\n\nBut here's the good news: awareness is genuinely the first step to change. Dr. Dan Siegel's research on neuroplasticity shows that understanding your patterns actually begins to rewire them. Reflect on patterns you notice without judgment. Work through unresolved emotions - therapy or coaching can accelerate this process significantly.\n\nPractice self-compassion as you do this work. Dr. Kristin Neff's research shows that self-compassion increases relationship satisfaction and decreases anxiety. Choose partners who support your healing rather than trigger your wounds, and remember: your past doesn't define your future, but understanding it helps you create healthier relationships moving forward.",
  
  'boundaries': "Healthy boundaries are essential for lasting relationships, and research from Dr. Brené Brown shows they're actually what allow intimacy to flourish, not what prevents it.\n\nCommunicate your needs clearly and directly - hinting doesn't work and sets both people up for frustration. It's okay to say no without explanation or justification. Respect their boundaries as you want yours respected; reciprocity builds trust. Remember that boundaries change and should be checked in on regularly as relationships evolve.\n\nHere's a critical insight from clinical research: watch for people who push back on boundaries or make you feel guilty for having them. That's a red flag, not a negotiation. Dr. Henry Cloud's work on boundaries shows that people who respect your boundaries are safer partners, even when your boundaries inconvenience them.\n\nBoundaries aren't walls - they're the doors that let the right people in while protecting your well-being. Studies show that couples with clear, respected boundaries report 50% higher relationship satisfaction than those without. You're not being difficult; you're being clear.",
  
  'moving_on': "Moving forward after heartbreak is a process, not an event, and neuroscience research shows that heartbreak activates the same brain regions as physical pain - so be patient with yourself.\n\nAllow yourself to fully feel and grieve. Suppressing emotions extends the healing timeline, according to Dr. James Pennebaker's research on emotional processing. Cut contact to create healing space - I know it's hard, but studies show that continued contact with an ex extends the grieving period by an average of 60%.\n\nReconnect with yourself and your interests. Relationships change us, and rediscovering who you are independently is crucial. Lean on your support system; research from Dr. Sheldon Cohen shows that social support is one of the strongest predictors of resilience after loss.\n\nAvoid rushing into something new. Rebound relationships have a 90% failure rate according to dating research, and they often prevent genuine healing. Learn the lessons without blame - self-reflection without self-punishment is the goal. Be patient with yourself; healing isn't linear, and that's completely normal.\n\nYou'll know you're ready when thinking about them doesn't hurt, but teaches. That shift from pain to wisdom is what true healing looks like.",
  
  'compatibility': "True compatibility goes far beyond initial attraction, and long-term relationship research gives us clear markers of what actually matters.\n\nDr. John Gottman's 40-year study found that shared core values and life goals predict relationship success more than personality similarity. You can have different hobbies, but differing core values creates constant friction. Similar communication styles - or willingness to adapt - matters enormously. Dr. Sue Johnson's research shows that couples who can 'speak the same language' emotionally have significantly higher satisfaction rates.\n\nAligned relationship expectations are crucial. If one person wants marriage and kids while the other wants to keep things casual, no amount of chemistry fixes that gap. Mutual respect and emotional safety should be non-negotiable; without these, nothing else works.\n\nComplementary personalities often work better than identical ones - think puzzle pieces, not mirrors. Compatible conflict resolution approaches might be the most underrated factor; research shows how you fight matters more than what you fight about. Similar priorities around family, money, and lifestyle prevent the friction that erodes relationships over time.\n\nChemistry gets you interested, but compatibility keeps you together. As relationship researcher Dr. Ty Tashiro found, most people overweight attraction and underweight compatibility - don't fall into that trap.",
  
  'timing': "Relationship timing matters more than we admit, and it's one of those uncomfortable truths that research supports but romantics resist.\n\nBoth people need to be emotionally ready - not 'working on it' ready, but actually ready. Life circumstances should support the relationship; if someone's in crisis mode, they don't have the bandwidth for real partnership. Here's the hard truth from Dr. Stan Tatkin's research: you shouldn't have to convince someone of timing. If they're making you wait indefinitely, that's information.\n\nThe phrase 'right person, wrong time' often means wrong person with an excuse. Dr. Alexandra Solomon's research on relationship readiness found that when someone truly wants to be with you, they find a way to make it work despite circumstances. They don't put you on hold indefinitely hoping you'll still be available later.\n\nIf someone wants to be with you, they'll make the time work - not perfectly, but genuinely. Don't settle for 'maybe later' or 'not right now.' You deserve 'absolutely yes, let's figure this out together.' Timing is real, but it shouldn't be an endless waiting game.",
  
  'self_worth': "Your relationship with yourself sets the tone for all others - this isn't self-help fluff, it's backed by decades of psychology research.\n\nDr. Brené Brown's work on worthiness shows that you teach people how to treat you through what you accept. Self-love isn't selfish; it's essential for healthy relationships. Studies from Dr. Kristin Neff on self-compassion found that people with high self-worth choose better partners and have more satisfying relationships.\n\nHere's a crucial insight: your worth isn't determined by their interest. When someone doesn't choose you, it's information about compatibility and timing, not a referendum on your value. Choose partners who add to your life, not complete it - research shows that healthy interdependence beats codependence every time.\n\nNever compromise your core values for someone's approval. Dr. John Gottman found that people who maintain their sense of self within relationships report 65% higher satisfaction than those who lose themselves in partnership.\n\nWhen you know your worth, you won't settle for breadcrumbs. You'll wait for the whole feast - someone who shows up consistently, treats you with respect, and values what you bring to their life.",
  
  'trust': "Trust is the foundation of intimacy, and Dr. John Gottman's research is crystal clear: trust is built in very small moments, not grand gestures.\n\nTrust is earned through consistent actions over time. Be reliable and follow through on commitments, even small ones - these deposits into the 'trust bank' add up. Practice transparency and honesty, not just about big things but about everyday life. Research from Dr. Sue Johnson shows that predictability creates safety, and safety allows vulnerability.\n\nRespect confidentiality and privacy. Acknowledge mistakes quickly and repair breaches with genuine accountability, not just apologies. Dr. Harriet Lerner's work on apologies shows that taking responsibility without defensive justifications rebuilds trust faster.\n\nTrust your intuition about trustworthiness - your subconscious picks up on patterns your conscious mind might rationalize away. And here's the hard truth: once broken, trust takes significantly longer to rebuild than it took to create. Dr. Robert Hurley's research on trust shows that rebuilding requires about 2-3 times the original investment, assuming both people are genuinely committed to the work.",
  
  'intimacy': "Intimacy is so much more than physical connection, and understanding this distinction transforms relationships.\n\nEmotional intimacy means sharing feelings and vulnerabilities - research from Dr. Arthur Aron shows that mutual vulnerability creates connection faster than almost anything else. Intellectual intimacy involves deep conversations and sharing ideas; couples who engage in novel, stimulating conversations report higher satisfaction. Physical intimacy includes affection and sexual connection, but studies show that non-sexual touch is equally important for bonding. Experiential intimacy is about creating memories together; shared experiences build the foundation of 'us.'\n\nHealthy intimacy requires mutual consent and respect in all its forms. Open communication about needs prevents assumptions and resentment. Patience and understanding are essential; Dr. Emily Nagoski's research on sexual wellbeing shows that intimacy unfolds at different paces for different people. Emotional safety to be vulnerable is the prerequisite for all other forms of intimacy - without it, everything else is just going through motions.",
  
  'conflict': "Conflict isn't the problem in relationships - how you handle it is. Dr. John Gottman's research famously identified the 'Four Horsemen' of relationship apocalypse: criticism, contempt, defensiveness, and stonewalling.\n\nAddress issues early before resentment builds - waiting doesn't make problems easier, it makes them bigger. Focus on the problem, not attacking the person. Use 'I feel' instead of 'You always' - this reduces defensiveness by about 60% according to communication research.\n\nListen to understand, not to win. Dr. Harville Hendrix's work on Imago therapy shows that feeling heard matters more than being right. Take breaks if emotions run too high; research shows that when heart rates exceed 100bpm, productive conversation becomes nearly impossible. Seek compromise, not domination - win/lose dynamics create long-term resentment.\n\nApologize sincerely when you're wrong. Dr. John Gottman found that successful couples had a 5:1 ratio of positive to negative interactions, and genuine repair attempts count heavily on the positive side. Conflict handled well brings you closer, not apart - it's about showing each other you can work through hard things together.",
  
  'anxiety': "Relationship anxiety is incredibly common, and understanding attachment theory helps make sense of these patterns.\n\nRecognize your attachment style patterns - anxious attachment develops early but can be earned secure through understanding and practice. Communicate your needs rather than testing your partner; research from Dr. Sue Johnson shows that expressing vulnerability directly is far more effective than creating tests they might fail.\n\nPractice self-soothing techniques when anxiety spikes. Dr. Stan Tatkin's work on couple therapy emphasizes that you can't regulate with someone else until you can partially regulate yourself. Challenge anxious thoughts with evidence - is this fear based on current reality or past wounds?\n\nBuild secure relationships through consistency, both from your partner and from yourself. Consider therapy for deeper healing; attachment-based therapy has strong research support for creating earned secure attachment. And remember this insight from Dr. Dan Siegel: anxiety is information, not a prophecy. It's your nervous system trying to protect you, even when protection isn't needed.",
  
  'long_distance': "Long-distance relationships can absolutely work - research from Dr. Crystal Jiang shows they can even increase emotional intimacy when done well.\n\nEstablish clear communication routines that work for both time zones and schedules. Plan visits and count down together - having concrete dates to look forward to reduces anxiety significantly. Share daily life through photos and videos; staying integrated in each other's lives matters.\n\nHave an end date or plan for closing the distance. Research shows that LDRs without a closing plan have much higher failure rates. Maintain individual lives and growth - don't put your life on hold waiting. Trust is absolutely essential; without it, the distance becomes torture rather than just inconvenient.\n\nDr. Gregory Guldner's research on long-distance relationships found that they fail at about the same rate as geographically close relationships - distance isn't the real issue, commitment and communication are. Distance is temporary if the connection is real.",
  
  'family': "Navigating family dynamics in relationships requires establishing your own unit while respecting existing bonds - research from Dr. Terri Orbuch shows this balance is crucial for long-term success.\n\nEstablish boundaries with extended family early and kindly. Be a united front as a couple when it comes to outside pressures. Respect each other's family relationships even when you don't understand them; people's bonds with family are complex and long-standing.\n\nAddress family conflicts privately first before involving extended family. Don't expect your partner to choose sides between you and their family - that creates impossible positions. Create your own traditions together; Dr. William Doherty's research shows that couples who build unique rituals report higher satisfaction.\n\nRemember: you're building a new family unit together. Your primary loyalty should be to your partnership, but that doesn't mean cutting ties with where you came from. It's about integration, not replacement.",
  
  'finance': "Money is one of the top three conflict areas in relationships, but research from Dr. Sonya Britt shows that it's not money itself that causes problems - it's avoiding money conversations.\n\nDiscuss financial values and goals early, ideally before combining finances. Be transparent about debt, spending habits, and money history. Decide on joint versus separate accounts based on what feels fair to both of you, not what you 'should' do. Plan for major expenses together and respect different money mindsets that come from different upbringings.\n\nRegular money check-ins prevent surprises and resentment. Dr. Brad Klontz's research on financial psychology shows that money conflicts often mask deeper values misalignment - someone who saves obsessively might value security, while someone who spends freely might value experiences. Neither is wrong, but understanding the 'why' behind the 'what' is crucial.\n\nCouples who can talk about money openly and without judgment have significantly lower divorce rates. Don't let money be the thing you can't talk about.",
  
  'marriage': "Knowing if you're ready for marriage goes beyond loving someone - Dr. John Gottman's research on marriage gives us clear indicators.\n\nYou've weathered challenges together and seen how you handle adversity as a team. You align on major life goals including kids, location, and core values - love doesn't conquer fundamental incompatibility. You bring out the best in each other more often than not.\n\nYou can genuinely imagine growing old together, not just the wedding or honeymoon phase. Financial transparency and compatibility exist; you've had the hard money conversations. Family dynamics feel manageable even if not perfect. You choose them daily, not just love them - commitment is a verb, not just a feeling.\n\nHere's what research consistently shows: marriage amplifies what's already there, good and bad. It doesn't fix problems; it often magnifies them under the pressure of legal, financial, and social commitment. Make sure what you're amplifying is worth it.",
  
  'breakup': "Navigating a breakup with dignity serves your healing, even when it feels impossible in the moment.\n\nAccept that ending isn't failing - sometimes love isn't enough, and that's a mature realization, not a defeat. Allow yourself to grieve the loss fully; Dr. James Pennebaker's research shows that suppressing grief extends it. No contact really does help healing - studies show continued contact with an ex extends the grief period by an average of 60%.\n\nResist the urge to check their social media. Each time you do, you're interrupting your healing process and re-opening the wound. Learn the lessons without obsessing - reflection is healthy, rumination is not. Rebuild your individual identity; relationships change us, and rediscovering yourself is part of healing.\n\nDon't rush into rebound relationships - they have a 90% failure rate and often prevent genuine healing. As relationship researcher Dr. Ty Tashiro puts it: every ending makes room for new beginnings, but only if you actually let the ending happen.\n\nGive yourself time. Most research suggests it takes about half the length of the relationship to fully move on. Be patient with yourself.",
  
  'jealousy': "Jealousy exists on a spectrum, and understanding where you fall helps determine if it's normal or concerning.\n\nNormal jealousy is occasional, manageable, and can be talked through. Unhealthy jealousy is constant, controlling, and leads to isolation. Dr. Robert Leahy's research on jealousy shows it often stems from insecurity, past betrayal, or legitimate concerns about the current relationship.\n\nIf you feel jealous, examine the root cause honestly. Is it insecurity about yourself, or real concerning behavior from your partner? Communicate without accusing - 'I feel anxious when...' rather than 'You're making me jealous by...' Work on self-esteem; research shows confident people experience less jealousy. Request reassurance appropriately, not constantly.\n\nIf they're jealous, offer reasonable reassurance while maintaining your autonomy. Don't sacrifice friendships or independence to manage someone else's insecurity. Watch for escalating control patterns - jealousy that increases over time or leads to isolation is a red flag requiring serious attention.",
  
  'love_languages': "Understanding love languages, from Dr. Gary Chapman's research, genuinely transforms relationships when applied correctly.\n\nThe five languages are: Words of Affirmation (verbal appreciation), Quality Time (undivided attention), Acts of Service (helpful actions), Physical Touch (affection and intimacy), and Receiving Gifts (thoughtful presents).\n\nHere's what most people miss: you need to understand both your languages AND speak theirs, not just yours. Research shows that people instinctively give love in their own language, but your partner might be speaking a completely different one. When both people speak the other's language, satisfaction rates increase dramatically.\n\nMismatched languages aren't dealbreakers - they're learning opportunities. Someone whose primary language is Acts of Service might not instinctively understand why their Words of Affirmation partner needs verbal appreciation. But with awareness and effort, these differences become strengths, not obstacles.",
  
  'expectations': "Unspoken expectations are relationship poison - research from Dr. John Gottman shows they're a leading cause of resentment.\n\nDiscuss expectations explicitly rather than assuming your partner should 'just know.' Separate needs (essential) from wants (preferred) - conflating these creates unnecessary conflict. Adjust unrealistic fairy-tale expectations; Dr. Eli Finkel's research found that sky-high expectations set relationships up for inevitable disappointment.\n\nAccept that no one person can meet every need - that's not a failing of the relationship, it's reality. Reevaluate expectations as relationships evolve; what you needed at six months might differ from what you need at six years. Communicate clearly when expectations aren't being met, giving your partner the chance to adjust before resentment builds.\n\nUnspoken expectations become resentments. Speak them early, adjust them often, and hold them lightly enough to allow for growth.",
  
  'lgbtq': "LGBTQ+ relationships carry all the same fundamentals as any relationship, with some unique considerations that deserve acknowledgment and support.\n\nYour relationship is just as valid and valuable as any other - full stop. Coming out is a deeply personal journey; move at your own pace and honor your partner's timeline too. Use the names and pronouns your partner prefers without exception; this is basic respect and love.\n\nBuild chosen family - for many LGBTQ+ folks, chosen family becomes primary support. Dr. Ilan Meyer's research on minority stress shows that community connection is protective against the mental health impacts of discrimination. Address internalized stigma with compassion for yourself; unlearning societal messages takes time and often therapeutic support.\n\nNavigate visibility and safety together, recognizing that what feels safe varies by location, context, and individual comfort. Seek LGBTQ+-affirming spaces and support; research consistently shows that affirmation correlates with better mental health outcomes.\n\nUnique considerations include: coming out timelines may differ between partners, requiring patience and communication. Family acceptance varies widely - support each other through rejection and celebration alike. Dating apps and spaces may require extra safety awareness. Legal protections vary dramatically by location - know your rights. Gender roles and relationship expectations are yours to define, free from heteronormative scripts.\n\nYour love deserves celebration, not justification. Find your people, honor your truth, and build the relationship that feels authentic to you. Research from Dr. John Gottman's work with same-sex couples shows that LGBTQ+ relationships often demonstrate higher equality and lower power struggles than heterosexual ones - lead with that strength.",
};

// Comprehensive keyword mapping system (100+ relationship terms)
const KEYWORD_MAP: Record<string, string[]> = {
  'emotional': ['emotional', 'available', 'vulnerability', 'vulnerable', 'feelings', 'emotions', 'emotionally', 'feeling', 'open up', 'share feelings', 'emotional connection'],
  'safety': ['red flag', 'warning', 'danger', 'unsafe', 'toxic', 'currently abusive', 'controlling', 'manipulative', 'manipulation', 'gaslighting', 'narcissist', 'signs', 'watch out'],
  'communication': ['communication', 'communicate', 'talk', 'talking', 'conversation', 'discuss', 'listening', 'listen', 'express', 'speaking', 'dialogue', 'verbal'],
  'dating': ['first date', 'dating', 'date', 'questions to ask', 'what to ask', 'getting to know', 'early stages', 'beginning', 'starting out', 'new relationship'],
  'readiness': ['ready', 'prepared', 'commitment', 'committed', 'settle down', 'serious relationship', 'am i ready'],
  'past': ['past abuse', 'past trauma', 'childhood trauma', 'old wounds', 'unhealed', 'unresolved trauma', 'still affecting', 'still bothers', 'haunting me', 'cant forget', "can't forget", 'past', 'history', 'ex', 'previous', 'baggage', 'trauma', 'childhood', 'patterns', 'repeating', 'cycle', 'flashbacks', 'triggered', 'ptsd'],
  'boundaries': ['boundaries', 'boundary', 'limits', 'saying no', 'space', 'personal space', 'respect', 'line', 'overstepping'],
  'moving_on': ['moving on', 'getting over', 'heartbreak', 'breakup pain', 'heal', 'healing', 'recovery', 'closure', 'forget', 'move forward', 'let go'],
  'compatibility': ['compatibility', 'compatible', 'match', 'right fit', 'work together', 'suited', 'aligned', 'alignment'],
  'timing': ['timing', 'right time', 'wrong time', 'when', 'too soon', 'too late', 'pace', 'rushed', 'rushing'],
  'self_worth': ['self worth', 'self-worth', 'self esteem', 'self-esteem', 'self love', 'self-love', 'loving myself', 'confidence', 'value myself', 'deserve', 'settling', 'enough'],
  'trust': ['trust', 'trusting', 'trustworthy', 'faith', 'believe', 'honesty', 'honest', 'dishonest', 'lying', 'lies', 'cheating', 'loyalty', 'loyal', 'faithful'],
  'intimacy': ['intimacy', 'intimate', 'sex', 'sexual', 'physical', 'affection', 'touching', 'closeness', 'bedroom', 'desire', 'attraction'],
  'conflict': ['fight', 'fighting', 'argue', 'argument', 'disagreement', 'disagree', 'conflict', 'tension', 'dispute', 'resolution', 'resolve', 'handle stress', 'handling stress', 'difficult times', 'cope', 'coping'],
  'anxiety': ['anxiety', 'anxious', 'worried', 'worry', 'overthinking', 'overthink', 'insecure', 'insecurity', 'attachment', 'clingy', 'needy'],
  'long_distance': ['long distance', 'ldr', 'far apart', 'different cities', 'different states', 'miles away', '远距离', 'distance'],
  'family': ['family', 'parents', 'in-laws', 'relatives', 'mother', 'father', 'siblings', 'family dynamics'],
  'finance': ['money', 'financial', 'finances', 'budget', 'debt', 'spending', 'saving', 'income', 'expensive', 'afford', 'cost'],
  'marriage': ['marriage', 'marry', 'married', 'wedding', 'engagement', 'engaged', 'propose', 'proposal', 'spouse', 'husband', 'wife'],
  'breakup': ['breakup', 'break up', 'ending', 'end it', 'split', 'separate', 'separation', 'divorce', 'leaving', 'broke up'],
  'jealousy': ['jealous', 'jealousy', 'envious', 'envy', 'possessive', 'insecure about', 'threatened'],
  'love_languages': ['love language', 'love languages', 'how they show love', 'express love', 'affection style'],
  'expectations': ['expect', 'expectations', 'assuming', 'should', 'supposed to', 'thought they would', 'disappointed'],
  'lgbtq': ['queer', 'gay', 'lesbian', 'bisexual', 'bi', 'pansexual', 'pan', 'transgender', 'trans', 'non-binary', 'nonbinary', 'enby', 'genderqueer', 'genderfluid', 'coming out', 'closeted', 'pride', 'lgbtq', 'lgbtqia', 'same-sex', 'same sex', 'gender identity', 'sexual orientation', 'pronouns', 'they/them', 'she/her', 'he/him', 'asexual', 'ace', 'aromantic', 'aro', 'polyamorous', 'poly', 'chosen family'],
};

export function AICoachScreen({ onBack, onNavigateHome }: AICoachScreenProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hi! I'm your AI dating coach. I'm here to help you navigate dating with confidence and clarity. What would you like to talk about today?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [userContext, setUserContext] = useState<UserContext>({
    concerns: [],
    topics: [],
    previousQuestions: [],
    mentionedIssues: [],
  });

  // Extract context from user messages
  const updateContext = (message: string) => {
    const lowerMessage = message.toLowerCase();
    
    // Extract names
    const namePatterns = [
      /my name is (\w+)/i,
      /i'?m (\w+)/i,
      /call me (\w+)/i,
    ];
    for (const pattern of namePatterns) {
      const match = message.match(pattern);
      if (match && match[1]) {
        setUserContext(prev => ({ ...prev, name: match[1] }));
      }
    }
    
    // Extract partner name (inclusive of all relationship types)
    const partnerPatterns = [
      /(?:with|dating|seeing) (\w+)/i,
      /(?:his|her|their|my partner's) name is (\w+)/i,
      /(\w+) and (?:i|me)/i,
      /my (?:boyfriend|girlfriend|partner|spouse|wife|husband) (\w+)/i,
    ];
    for (const pattern of partnerPatterns) {
      const match = message.match(pattern);
      if (match && match[1] && match[1].length > 2) {
        setUserContext(prev => ({ ...prev, partnerName: match[1] }));
      }
    }
    
    // Detect relationship status (inclusive language)
    if (lowerMessage.includes('single') || lowerMessage.includes('not dating') || lowerMessage.includes('not in a relationship')) {
      setUserContext(prev => ({ ...prev, relationshipStatus: 'single' }));
    } else if (lowerMessage.includes('dating') || lowerMessage.includes('seeing someone') || lowerMessage.includes('talking to someone')) {
      setUserContext(prev => ({ ...prev, relationshipStatus: 'dating' }));
    } else if (
      lowerMessage.includes('relationship') || 
      lowerMessage.includes('partner') || 
      lowerMessage.includes('boyfriend') || 
      lowerMessage.includes('girlfriend') ||
      lowerMessage.includes('spouse') ||
      lowerMessage.includes('wife') ||
      lowerMessage.includes('husband') ||
      lowerMessage.includes('married') ||
      lowerMessage.includes('engaged')
    ) {
      setUserContext(prev => ({ ...prev, relationshipStatus: 'committed' }));
    } else if (lowerMessage.includes('complicated') || lowerMessage.includes('confus') || lowerMessage.includes('not sure')) {
      setUserContext(prev => ({ ...prev, relationshipStatus: 'complicated' }));
    }
    
    // Track topics discussed
    for (const [category, keywords] of Object.entries(KEYWORD_MAP)) {
      if (keywords.some(keyword => lowerMessage.includes(keyword))) {
        setUserContext(prev => ({
          ...prev,
          topics: Array.from(new Set([...prev.topics, category])),
        }));
      }
    }
    
    // Track mentioned issues (expanded for LGBTQ+ specific concerns)
    const issues = [
      'jealous', 'controlling', 'lying', 'cheating', 'toxic', 'currently abusive',
      'distant', 'cold', 'unavailable', 'commitment issues', 'trust issues',
      'anxious', 'insecure', 'worried', 'scared', 'confused',
      'homophobia', 'transphobia', 'discrimination', 'not accepted', 'closeted fear'
    ];
    for (const issue of issues) {
      if (lowerMessage.includes(issue)) {
        setUserContext(prev => ({
          ...prev,
          mentionedIssues: Array.from(new Set([...prev.mentionedIssues, issue])),
        }));
      }
    }
    
    // Store question
    setUserContext(prev => ({
      ...prev,
      previousQuestions: [...prev.previousQuestions, message].slice(-10), // Keep last 10
    }));
  };

  const handleSendMessage = (content: string) => {
    if (!content.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    
    // Update context from user message
    updateContext(content);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: getAIResponse(content, userContext),
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  const getAIResponse = (userMessage: string, context: UserContext): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Find matching category with scoring
    let bestMatch: { category: string; score: number } | null = null;
    
    for (const [category, keywords] of Object.entries(KEYWORD_MAP)) {
      let score = 0;
      
      for (const keyword of keywords) {
        if (lowerMessage.includes(keyword)) {
          // Multi-word phrases get higher scores
          const wordCount = keyword.split(' ').length;
          score += wordCount * 10;
          
          // Exact phrase matches get bonus
          if (lowerMessage === keyword || lowerMessage.startsWith(keyword + ' ') || lowerMessage.endsWith(' ' + keyword)) {
            score += 20;
          }
        }
      }
      
      if (score > 0) {
        if (!bestMatch || score > bestMatch.score) {
          bestMatch = { category, score };
        }
      }
    }
    
    const matchedCategory = bestMatch?.category || null;
    
    // Get base response
    let response = matchedCategory 
      ? AI_RESPONSES[matchedCategory]
      : "That's a great question! I'm here to help with:\n\n• Understanding emotional availability\n• Identifying red flags and safety concerns\n• Improving communication skills\n• Navigating first dates and early connections\n• Building healthy relationship foundations\n\nWhat specific aspect would you like to explore?";
    
    // Add personalized context if available
    const personalizations: string[] = [];
    
    // Reference their name
    if (context.name && Math.random() > 0.5) {
      personalizations.push(`${context.name}`);
    }
    
    // Reference partner if mentioned
    if (context.partnerName && matchedCategory && Math.random() > 0.3) {
      personalizations.push(`regarding ${context.partnerName}`);
    }
    
    // Reference relationship status
    if (context.relationshipStatus === 'single' && matchedCategory === 'readiness') {
      response += "\n\nSince you're single, this is the perfect time to work on yourself and clarify what you want in your next relationship.";
    } else if (context.relationshipStatus === 'dating' && (matchedCategory === 'safety' || matchedCategory === 'boundaries')) {
      response += "\n\nIn early dating, it's especially important to pay attention to these signs and set clear boundaries.";
    } else if (context.relationshipStatus === 'committed' && matchedCategory === 'communication') {
      response += "\n\nIn established relationships, maintaining strong communication becomes even more crucial over time.";
    } else if (context.relationshipStatus === 'complicated') {
      response += "\n\nWhen things feel complicated, clarity and honest self-reflection are your best tools.";
    }
    
    // Reference previous topics for continuity
    if (context.topics.length > 1 && matchedCategory) {
      const otherTopics = context.topics.filter(t => t !== matchedCategory).slice(-2);
      if (otherTopics.length > 0) {
        const topicNames = otherTopics.map(t => t.replace('_', ' '));
        response += `\n\nI notice we've also discussed ${topicNames.join(' and ')}. All these pieces connect - healthy relationships require attention to multiple areas.`;
      }
    }
    
    // Reference serious issues mentioned
    if (context.mentionedIssues.length > 0 && (matchedCategory === 'safety' || matchedCategory === 'boundaries')) {
      const seriousIssues = ['controlling', 'currently abusive', 'toxic', 'lying', 'cheating'];
      const hasSeriousIssues = context.mentionedIssues.some(issue => seriousIssues.includes(issue));
      if (hasSeriousIssues) {
        response += "\n\n⚠️ Based on what you've shared, I'm concerned about your safety and well-being. Please consider reaching out to a trusted friend, family member, or professional counselor. You deserve to feel safe and respected in your relationships.";
      }
    }
    
    return response;
  };

  const handlePromptClick = (prompt: { text: string; category: string }) => {
    handleSendMessage(prompt.text);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-500 via-violet-500 to-purple-600 px-6 pt-12 pb-6">
        <button onClick={onBack} className="flex items-center gap-2 text-white mb-6">
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl text-white">AI Dating Coach</h1>
            <p className="text-white/90 text-sm">Get personalized guidance and insights</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-3xl px-5 py-3 ${
                message.type === 'user'
                  ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-br-lg'
                  : 'bg-white shadow-md text-gray-900 rounded-bl-lg'
              }`}
            >
              {message.type === 'ai' && (
                <div className="flex items-center gap-2 mb-2">
                  <Bot className="w-4 h-4 text-purple-600" />
                  <span className="text-xs text-purple-600">AI Coach</span>
                </div>
              )}
              <p className="text-sm leading-relaxed whitespace-pre-line">{message.content}</p>
            </div>
          </div>
        ))}

        {/* Suggested Prompts (only show at start) */}
        {messages.length === 1 && (
          <div className="space-y-3 pt-4">
            <p className="text-sm text-gray-600 text-center mb-4">Try asking about:</p>
            {SUGGESTED_PROMPTS.map((prompt, index) => {
              const Icon = prompt.icon;
              return (
                <button
                  key={index}
                  onClick={() => handlePromptClick(prompt)}
                  className="w-full bg-white p-4 rounded-2xl shadow-md hover:shadow-lg transition-all text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5 text-purple-600" />
                    </div>
                    <span className="text-sm text-gray-900">{prompt.text}</span>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-200 px-6 py-4">
        <div className="max-w-3xl mx-auto flex gap-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
            placeholder="Ask me anything about dating..."
            className="flex-1 px-5 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900"
          />
          <button
            onClick={() => handleSendMessage(inputValue)}
            disabled={!inputValue.trim()}
            className={`px-6 py-3 rounded-2xl transition-all ${
              inputValue.trim()
                ? 'bg-gradient-to-r from-purple-500 to-violet-500 text-white shadow-lg hover:shadow-xl'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Home Button */}
      {onNavigateHome && <HomeButton onClick={onNavigateHome} />}
    </div>
  );
}