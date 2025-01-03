import { FaXTwitter, FaYoutube } from "react-icons/fa6";

export const Faqs = [
  {
    title: "What classifies as a prediction? ",
    content: (
      <div className="">
        A prediction is defined as any message or segment of content that
        directly or implicitly forecasts a future event, asset price change, or
        other measurable occurrence that has yet to happen. Trivial and
        immeasurable predictions are ignored. <br />
        <br />
        Our advanced AI systems are used to distinguish between content and
        segments of content that contain predictions from those that don't. We
        analyze content for context, responses to previous statements and
        metadata to determine if a statement can be classified as a prediction.
        Predictions of a personal, inconsequential or unverifiable nature are
        excluded from verification, scoring and classification. Examples
        include: My mom is coming to meet me for lunch tomorrow. There will be a
        full moon next Tuesday. People will think this in response to that.
      </div>
    ),
  },
  {
    title: "What types of predictions are there?",
    content:
      "Binary predictions involve predicting a specific event outcome with a defined timeframe, evaluated as TRUE/FALSE, like forecasting a sports match winner. Continuous predictions forecast variables that can take any value within a range, such as temperatures or stock prices, with accuracy measured by how close the predicted value is to the actual result. Non-predictions are vague statements lacking specific outcomes or timeframes, making them impossible to score accurately",
  },
  {
    title: "What are the different statuses of a prediction?",
    content: (
      <div className="">
        A prediction can have one of five statuses;
        <ol className="list-decimal">
          <li className="">True: The prediction was determined to be true</li>
          <li className="">False: The prediction was determined to be false</li>
          <li className="">
            Partially True: The prediction was determined to be partially true
          </li>
          <li className="">
            {" "}
            Pending: The real world event that was forecast has not yet occurred
          </li>
          <li className="">
            Undetermined: The prediction is too vague or impossible to verify
            accurately
          </li>
        </ol>
      </div>
    ),
  },
  {
    title: "How do we determine if a prediction is TRUE, FALSE, etc?",
    content:
      "The status of a prediction is determined by using our proprietary AI-powered verification system to create research streams that break a prediction down into research topics (research data are sourced from: news outlets, financial markets, asset exchanges, sport authorities, betting markets, etc). We then pass the research output through our guidelines and standards to make a judgment based o5n the evidence as to the status of a prediction. If there is no consensus, or data is unavailable, the prediction is classified as Undetermined. ",
  },
  {
    title: "How does Lucky or Genius source its information?",
    content:
      "We process historical and current content (youtube videos, tweets, articles, podcasts, etc) to look for predictions made by speakers, authors and publications. We are a multi-modal platform that can process any medium to identify and extract predictions. ",
  },
  {
    title: "How do we determine who has made the prediction?",
    content:
      "For text based content we assign the prediction to the account publishing the content and to the organization or channel involved. We also use proprietary AI-powered voice and facial recognition methods to identify speakers in audio and video media and assign the corresponding text to identified speakers.",
  },
  {
    title: "What platforms does Lucky or Genius monitor?",
    content:
      "Currently our platform is available for use with Discord and YouTube. We are actively expanding our coverage to Twitter/X, Reddit, Spotify TikTok and Telegram with additional platform coverage to follow.",
  },
  {
    title: "Who can get a Lucky or Genius accountability profile?",
    content:
      "Anyone who makes predictions that are captured in some form of digital medium (text, image, audio or video).",
  },
  {
    title: "How do I see an accountability profile for someone specific?",
    content:
      "Search for the profile you’re after, if no results are available, go to the Sources page via the navigation bar and click on “Add Source” in the top right corner to input the URL of a YouTube video. A profile will be generated once a speaker has been identified by our software.",
  },
  {
    title: "How do I get a YouTube channel tracked automatically?",
    content:
      "This feature is under development and will be available soon. You will be able to head to the Sources page via the navigation bar and click on “Add Source” in the top right corner to input the URL of a YouTube channel. ",
  },
  {
    title: "How long does it take for a video to get processed?",
    content:
      "Processing times vary depending on user demand, currently we are processing video content that gets to the top of the queue at 4x speed with typical processing times taking 20-30 minutes.",
  },
  {
    title: "What happens once I submit a video?",
    content: (
      <div className="">
        Our system will perform the following operations on the source:
        <ul className="">
          <li className="">
            Identify the speakers in the video via face and voice print
            identification
          </li>
          <li className="">Create a labeled transcript with each speaker</li>
          <li className="">Identify and extract any predictions found</li>
          <li className="">Filter, categorize and refine predictions</li>
          <li className="">Validate and score all suitable predictions</li>
        </ul>
      </div>
    ),
  },
  {
    title: "How can I see the sources used to determine a prediction status?",
    content:
      "Every processed prediction has all relevant information pertaining to it available for viewing on the Predictions page. Click on any prediction and then scroll down to Justification & Sources to see the logic and sources that were used to determine the status of that prediction.",
  },
  {
    title: "What is an accountability profile?",
    content:
      "An accountability profile is the total historical record of any individual or group of people’s published and processed content. Accountability profiles consist of a series of metrics that represent the sum of all accuracy scores received for making predictions.",
  },
  {
    title: "What are the different types of accuracy scores in a profile?",
    content: (
      <div className="">
        Accuracy - Percentile of correct predictions out of total settled
        predictions.
        <br />
        ROI - Return on investment for predictions regarding financial assets or
        wagers. <br />
        Bankroll - A score that assumes $1k bets are made for every prediction
        at 1:1 odds. <br />
        Streak - Shows number of current consecutive consistent predictions,
        true or false.
      </div>
    ),
  },
  {
    title: "How do you calculate prediction scores?",
    content: (
      <div className="">
        Each prediction is scored using a point based system earning between
        -100 and +100 points. The total points a prediction earns are the sum of
        points received for the timeframe until the settlement date, and points
        received for relative error.
        <br />
        <br />
        When calculating scores for continuous predictions we take into account
        the relative error of the prediction to the predicted real world outcome
        and the timeframe over which the prediction was made. Forecasts
        predicting an event further out into the future earn more points than
        those forecasting events closer to publication date. <br />
        <br />
        Scores for binary predictions are calculated using the same method,
        assuming a relative error of 0 when the prediction is correct. Correct
        binary predictions receive positive scores identical to the negative
        scores received by incorrect predictions with the same timeframes.
      </div>
    ),
  },
  {
    title: "How do you calculate ROI?",
    content: (
      <div className="">
        Return on Investment (ROI) is calculated by determining the difference
        in price of the specified asset on the publication date of the
        prediction and then on the specified settlement date. If no settlement
        date is provided, ROI is calculated based on price snapshots are taken
        on dates offset from the publication date by the following intervals:
        <br />
        <br />1 day - 7 days - 30 days - 90 days - 180 days - 365 days - 730
        days - 1865 days
      </div>
    ),
  },
  {
    title: "What is a bankroll score?",
    content: (
      <div className="">
        A bankroll score is calculated by assuming that a $1,000 bet is placed
        on every prediction in a hypothetical betting market offering 1:1 odds
        on the wager. The current bankroll score shows how much money would be
        won or lost using this theoretical strategy. Developments are underway
        to use real odds from available betting markets in order to refine this
        scoring method further.
        <br />
        <br />A bankroll score shows consistency over volume. If Alice has made
        8 correct predictions out of 10 her accuracy score would be 80% and her
        bankroll score would be $6000. If Bob made 70 correct predictions out of
        100, his accuracy score would be 70% but his bankroll score would be
        $40,000. If Alice and Bob make contradicting forecasts, users may elect
        to factor in bankroll scores to determine which opinion deserves more
        merit.
      </div>
    ),
  },
  {
    title: "What is a streak?",
    content:
      "A measure of consistency, good or bad, showing how many correct or incorrect predictions the forecaster has made in a row, by publication date. ",
  },
  {
    title: "Can anyone get an accountability score?",
    content:
      "Yes! Provide a URL to the account or channel that you would like tracked and we will do the rest. If you are seeking to create a profile for someone within your personal network, upload the chat history to see the private report. ",
  },
  {
    title: "How does the Lucky or Genius Leaderboard work? ",
    content:
      "The Lucky or Genius Leaderboard offers users the ability to quickly compare accuracy by domain of expertise, timeframes and subject matter. People on the leaderboard are ranked based on their overall accuracy by default but can be reorganized by any tracked statistic.",
  },
  {
    title:
      "How do you ensure objectivity and avoid bias in your scoring methodology?",
    content:
      "The first step to achieving objectivity in our scoring occurs at the prediction extraction stage. Strict parameters are used to ignore all talking points without forecasts to ensure that only predictions go on to be verified against real world events. Future events like price changes of assets, sporting events or political outcomes are checked on settlement dates across multiple sources including news outlets, financial markets and sport books and authorities. Scores are issued formulaically without human intervention avoiding potential biases or conflicts of interest.",
  },
  {
    title:
      "What do I do if I think you scored or classified something incorrectly?",
    content:
      "Please use the feedback button at the bottom of every prediction card to let us know if you think we may have made an error in any part of the process including scoring, interpretation, validation, assignment to speaker or anything else that seems off.",
  },
];

export const TermsOfService = [
  {
    section: "1. Acceptance of Terms",
    content:
      'By accessing or using the website located at www.luckyorgenius.com (the \u201cSite\u201d), you agree to be bound by these Terms of Service (the "Terms"), as well as our Privacy Policy, which is incorporated herein by reference. These Terms apply to all users, including those located in the European Union, European Free Trade Association (EFTA) States, and the United Kingdom. If you do not agree to these Terms, you must immediately cease using the Site. Lucky or Genius reserves the right to modify these Terms at any time, and such modifications will be effective immediately upon posting. Continued use of the Site following the posting of any changes will constitute your acceptance of those changes.',
  },
  {
    section: "2. Nature of Service",
    content:
      'Lucky or Genius provides information, analyses, and data regarding predictions made by third parties, processed using proprietary AI algorithms (the "Services"). The Services are intended for educational and entertainment purposes only. Lucky or Genius is not a gambling platform, nor do we facilitate gambling or offer financial advice. We do not guarantee the accuracy or completeness of the data provided, and the content should not be construed as professional financial, legal, or other advice.',
  },
  {
    section: "3. Use of the Site and Services",
    content:
      "By using the Site, you agree that you will not use it for any unlawful purposes or in a manner that could damage, disable, overburden, or impair the Site or Services. You are responsible for any actions taken based on the information presented and should not rely on the Services for critical decision-making. We reserve the right to restrict or terminate your access to the Site at our discretion, without notice, for any conduct that we deem to be inappropriate, unlawful, or in violation of these Terms.",
  },
  {
    section: "4. Disclaimers and Limitation of Liability",
    subsections: [
      {
        title: "Informational Purpose Only",
        content:
          "The information and data presented on this Site are provided 'as-is' and without warranties of any kind. We disclaim all warranties, whether express or implied, including, but not limited to, the implied warranties of merchantability, fitness for a particular purpose, and non-infringement. Lucky or Genius makes no representations regarding the accuracy, reliability, completeness, or timeliness of the information available on the Site.",
      },
      {
        title: "Liability for Data Use",
        content:
          "We shall not be liable for any actions or outcomes resulting from the use of the data, content, or information provided through the Site. You agree that you use the Site and Services at your own risk, and we are not responsible for any financial or other losses that may occur as a result of reliance on the information available on the Site. The Site does not constitute professional advice, and users are solely responsible for their use of the Services.",
      },
      {
        title: "Limitation of Liability",
        content:
          "To the fullest extent permitted by applicable law, in no event shall Lucky or Genius, its affiliates, directors, officers, employees, or agents be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from: (i) your access to or use of or inability to access or use the Site; (ii) any conduct or content of any third party on the Site, including without limitation any defamatory, offensive, or illegal conduct of other users or third parties; (iii) any content obtained from the Site; and (iv) unauthorized access, use, or alteration of your transmissions or content. In jurisdictions where limitations of liability are not permitted by law, the limitations in this Section will apply to the fullest extent permitted by law.",
      },
    ],
  },
  {
    section: "5. Device and Social Media Account Responsibility",
    content:
      "We are not liable for any damage to your computer system, mobile device, or other technology that may occur as a result of using the Site. Additionally, Lucky or Genius disclaims all liability for any disruption, suspension, or deletion of social media accounts that may occur as a result of interaction with our Services. Any interactions you have on social media platforms are governed by those platforms\u2019 terms and conditions.",
  },
  {
    section: "6. Intellectual Property Rights",
    content:
      "All content, trademarks, and other intellectual property on this Site are owned by Lucky or Genius or its licensors. You may not reproduce, modify, distribute, or otherwise use any of the materials on the Site without prior written consent.",
  },
  {
    section: "7. Indemnification",
    content:
      "You agree to indemnify and hold harmless Lucky or Genius, its affiliates, directors, officers, employees, and agents from any and all claims, damages, losses, liabilities, and expenses (including reasonable attorneys' fees) arising out of or in any way related to your use of the Site, violation of these Terms, or any conduct in connection with your use of the Site.",
  },
  {
    section: "8. Governing Law and Dispute Resolution",
    content:
      "If you are a resident of the European Union, EFTA States, or the United Kingdom, these Terms are governed by and construed in accordance with the laws of the country in which you are domiciled. You may bring legal proceedings in the courts of your country of domicile. For all other users, these Terms will be governed by and construed in accordance with the laws of Delaware. Any disputes arising under these Terms will be subject to the exclusive jurisdiction of the courts in Delaware, USA.",
  },
  {
    section: "9. Amendments",
    content:
      "We may revise these Terms at any time without notice by posting an updated version on the Site. Your continued use of the Site after any such updates constitutes your acceptance of the new Terms.",
  },
  {
    section: "10. Contact Information",
    content:
      "For any questions about these Terms, please contact us at: Email: alek@luckyorgenius.com",
  },
];

export const PrivacyPolicy = [
  {
    section: "1. Introduction",
    content:
      "Welcome to Lucky or Genius! Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you visit our website or use our services. We encourage you to read this policy carefully and contact us if you have any questions.",
  },
  {
    section: "2. Information We Collect",
    content: "We collect different types of information, including:",
    subsections: [
      {
        title: "Identity Data",
        content: "First name, last name, username, or similar identifiers.",
      },
      {
        title: "Contact Data",
        content: "Email address, phone number.",
      },
      {
        title: "Technical Data",
        content:
          "IP address, browser type and version, operating system, platform, and other similar technologies.",
      },
      {
        title: "Usage Data",
        content:
          "Information about your interaction with our website, products, and services.",
      },
      {
        title: "Marketing and Communications Data",
        content:
          "Your preferences for receiving marketing and your communication preferences.",
      },
    ],
  },
  {
    section: "3. How We Collect Your Data",
    content:
      "We use various methods to collect data from and about you, including:",
    subsections: [
      {
        title: "Direct Interactions",
        content:
          "You may provide data by filling in forms, participating in competitions, or contacting us via email or phone.",
      },
      {
        title: "Automated Technologies",
        content:
          "We may automatically collect Technical Data as you interact with our site through the use of cookies, pixel tags, and other tracking technologies.",
      },
      {
        title: "Third Parties or Publicly Available Sources",
        content:
          "We may collect information about you from third parties (e.g., social media sites or business partners).",
      },
    ],
  },
  {
    section: "4. How We Use Your Data",
    content: "We use your personal data to:",
    subsections: [
      { content: "Register you as a customer." },
      {
        content:
          "Provide and manage services (e.g., sweepstakes, contests, and events).",
      },
      { content: "Send updates and marketing communications." },
      {
        content:
          "Analyze the performance of our website and improve user experience.",
      },
      {
        content:
          "Protect against fraud, unauthorized access, and other security threats.",
      },
    ],
  },
  {
    section: "5. Sharing Your Information",
    content: "We may share your personal information:",
    subsections: [
      {
        title: "With service providers",
        content:
          "For purposes of delivering our services and conducting our business operations.",
      },
      {
        title: "For legal reasons",
        content:
          "To comply with legal obligations, respond to government authorities, or protect our legal rights.",
      },
      {
        title: "With your consent",
        content:
          "Where you have provided consent for sharing your personal information for specific reasons.",
      },
    ],
  },
  {
    section: "6. Your Privacy Choices",
    content: "Depending on your location, you may have the following rights:",
    subsections: [
      {
        content:
          "Access: Request details about the personal data we hold about you.",
      },
      { content: "Correction: Have inaccurate or incomplete data corrected." },
      {
        content:
          "Deletion: Request deletion of your data under certain circumstances.",
      },
      {
        content:
          "Objection or Restriction: Object to or request restriction of processing.",
      },
      {
        content:
          "Data Portability: Receive an electronic copy of your personal data.",
      },
    ],
  },
  {
    section: "7. Data Security",
    content:
      "We implement robust security measures to protect your data. However, no method of transmission over the Internet or electronic storage is 100% secure. We strive to use commercially acceptable means to protect your personal data but cannot guarantee absolute security.",
  },
  {
    section: "8. Cookies and Tracking Technologies",
    content:
      "We use cookies, pixel tags, and other tracking technologies to collect and store information when you visit our website. These help us understand how you use our website and improve your experience. You can manage cookie preferences through your browser settings.",
  },
  {
    section: "9. International Transfers",
    content:
      "Your personal data may be transferred and processed in countries outside your home country. These countries may not have the same data protection laws, but we ensure that adequate safeguards are in place.",
  },
  {
    section: "10. Data Retention",
    content:
      "We retain your personal data only as long as necessary to fulfill the purposes for which it was collected or as required by law.",
  },
  {
    section: "11. Children’s Privacy",
    content:
      "Our services are not intended for individuals under the age of 13. We do not knowingly collect personal data from children. If you believe we have inadvertently collected such information, please contact us so we can take the appropriate steps.",
  },
  {
    section: "12. Changes to This Privacy Policy",
    content:
      "We may update this Privacy Policy from time to time. We will notify you of any changes by updating the \u201cEffective Date\u201d at the top of this policy. Please review this policy periodically to stay informed about how we are protecting your information.",
  },
  {
    section: "13. Contact Us",
    content:
      "If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at: Email: alek@luckyorgenius.com",
  },
];

export const SocialMediaLinks = [
  { icon: <FaXTwitter />, link: "https://x.com/luckyorgenius" },
  { icon: <FaYoutube />, link: "https://www.youtube.com/@LuckyorGenius" },
];
