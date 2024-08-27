import FeatureTitle from "../common/title";
import {
  AirdropsCard,
  WorldRecessionCard,
  DenialCard,
  SmarterCard,
} from "../common/feature";
// import { AirdropVisual, OtherVisual } from "./sections/visual";

const topics = [
  {
    title: "Verify lifelong reputations instantly.",
    id: "airdrops",
    card: AirdropsCard,
    subtitle:
      "  Reputations should be built up slowly and verified quickly. AI is used to track and score all forecasts extracted from any digital medium based on their accuracy.",
  },
  {
    title: "The alpha is in the details.",
    id: "world-recession",
    card: WorldRecessionCard,
    subtitle:
      "Don’t listen to the weatherman’s sports picks. Our proprietary AI automatically identifies, categorizes and shows you domains of expertise for every forecaster.",
  },
  // {
  //   title: "Or was in denial of it?",
  //   id: "denial",
  //   card: DenialCard,
  // },
  {
    title: "Browse all predictions..",
    subtitle:
      "Browse all predictions past, present and deleted! Effortlessly compare the opinions of different individuals and find new perspectives based on objective accuracy.",
    id: "debate-money",
    card: DenialCard,
  },
  // {
  //   title: "We're not Einsteins, but we know the smarter choice here!",
  //   id: "smarter-choice",
  //   card: SmarterCard,
  //   // visual: OtherVisual,
  // },
];

const SecondSection = () => {
  // const setFullScreenFeature = useTopicStore((state) => state.setFullscreenFeature)

  return (
    <div className="bg-[#000] hidden md:flex h-100vh">
      <div className="relative w-full">
        {/* {topics?.map((topic) => (
          <topic.visual key={topic.id} id={topic.id} />
          
        ))}
        <button onClick={() => setFullScreenFeature(null)} className={cn('back-to-site-btn fixed bottom-8 right-[calc(50%-67px)] transform  bg-black text-white px-4 py-1.5 rounded-xl font-semibold shadow-lg z-[9999999] flex items-center text-sm hover:bg-black/80 opacity-0 translate-y-[300px]')}><span>Back to site</span><XIcon className='ml-2 h-4 w-4' /></button> */}
        <div className="mx-auto w-full pl-32 h-full">
          <div className=" md:grid grid-cols-3 w-full gap-20 items-center h-full">
            <div className="w-full py-[10vh] col-span-1 ">
              <ul className="flex flex-col">
                {topics?.map((topic) => (
                  <li key={topic.id}>
                    <FeatureTitle
                      id={topic.id}
                      buttonText={topic.buttonText}
                      subtitle={topic.subtitle}
                    >
                      {topic.title}
                    </FeatureTitle>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:sticky md:top-6 md:bottom-0 md:w-full h-[95vh] md:flex items-center col-span-2">
              <div className="fixed right-0 my-auto w-full md:relative h-[95vh] md:w-full [&:not(:has(>_.active-card))]:bg-transparent md:[&:has(>_.active-card)]:bg-transparent">
                {topics?.map((topic) => (
                  <topic.card id={topic.id} key={topic.id} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondSection;
