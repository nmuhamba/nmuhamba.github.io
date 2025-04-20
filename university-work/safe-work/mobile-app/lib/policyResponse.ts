// lib/policyResponse.ts
import { create } from 'zustand';

type PolicyStore = {
  termsAccepted: boolean;
  privacyAccepted: boolean;
  acceptTerms: () => void;
  acceptPrivacy: () => void;
};

const policyStore = create<PolicyStore>((set) => ({
  termsAccepted: false,
  privacyAccepted: false,
  acceptTerms: () => set({ termsAccepted: true }),
  acceptPrivacy: () => set({ privacyAccepted: true }),
}));

export default policyStore;
