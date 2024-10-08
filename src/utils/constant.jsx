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
