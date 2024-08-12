import { create } from "zustand";

export const useTopicStore = create((set) => ({
  inViewTopic: null,
  setInViewTopic: (topic) => set({ inViewTopic: topic }),
  fullscreenFeature: null,
  setFullscreenFeature: (feature) => {
    set({ fullscreenFeature: feature });
    if (feature !== null) {
      set({ lastFullscreenFeature: feature });
    }
  },
  lastFullscreenFeature: null,
  setLastFullscreenFeature: (feature) =>
    set({ lastFullscreenFeature: feature }),
}));
