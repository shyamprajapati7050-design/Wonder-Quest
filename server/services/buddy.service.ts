import { BuddyHintRequest, BuddyHintResponse } from '../types/api.types';

export class BuddyService {
  private mentors: Record<string, { name: string; pitch: number; rate: number; defaultHint: string }> = {
    owl_pip: {
      name: 'Pip',
      pitch: 1.05,
      rate: 0.92,
      defaultHint: 'Look closely at the key words. The foundational pattern reveals the entire answer!',
    },
    fox_nova: {
      name: 'Nova',
      pitch: 1.25,
      rate: 1.02,
      defaultHint: 'Cosmic tip: Break big calculations down into small steps! Step one leads to step two!',
    },
    bear_barnaby: {
      name: 'Barnaby',
      pitch: 0.88,
      rate: 0.88,
      defaultHint: 'Take a gentle breath. Re-read the explanation calmly and let your thoughts settle.',
    },
    bot_sparky: {
      name: 'Sparky',
      pitch: 1.35,
      rate: 0.98,
      defaultHint: 'Beep-boop! Analyze the inputs and outputs systematically to reach the logical solution!',
    },
    dolphin_kira: {
      name: 'Kira',
      pitch: 1.18,
      rate: 0.96,
      defaultHint: 'Dive deep into the concept and connect what you know with the new clue!',
    },
  };

  getHint(req: BuddyHintRequest): BuddyHintResponse {
    const mentor = this.mentors[req.buddyId] || this.mentors.owl_pip;
    const student = req.childName || 'Explorer';

    const hint = `${mentor.name}'s Insight: Remember to focus on the key principles of this section!`;
    const speechText = `Hey ${student}! ${mentor.defaultHint}`;

    return {
      buddyId: req.buddyId,
      buddyName: mentor.name,
      hint,
      speechText,
      voiceConfig: {
        pitch: mentor.pitch,
        rate: mentor.rate,
      },
    };
  }
}

export const buddyService = new BuddyService();
