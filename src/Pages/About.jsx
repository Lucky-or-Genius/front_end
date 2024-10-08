import React from "react";

import Navbar from "../components/common/navbar/navbar";

const About = () => {
  return (
    <div className="bg-[#0B0B0F]">
      <Navbar />
      <div className="min-h-screen bg-[#0B0B0F] flex flex-col gap-8 p-4 md:p-16">
        <div className="flex gap-4 flex-col items-center">
          <h2 className="text-white text-3xl font-raleway font-semibold">
            What we do
          </h2>
          <span className="text-xl font-raleway text-primary400">
            We’re changing the game by keeping the score.
          </span>
          <span className="text-[#ffffff80] text-center font-poppins">
            Lucky or Genius is an AI-powered platform that tracks and processes
            digital content across the web and issues accountability profiles
            for anyone making predictions. Whether they are individual
            influencers, independent journalists, major media outlets or even
            someone from your personal network, anyone can get a Lucky or Genius
            accountability profile. Profiles consist of a comprehensive series
            of objectively calculated metrics allowing for easy identification
            and comparison of domains of expertise, overall and relative
            accuracy, ROI, and other stats.
            <br />
            <br />
            Advanced AI systems are used to monitor content creators across
            multiple platforms and to determine the accuracy of predictions
            extracted from the published articles, blogs, social media posts,
            images, videos and podcasts. We validate every prediction against
            real-world outcomes, objectively scoring each based on its accuracy,
            ROI, and relevance over time. The individual scores are used to
            create an accountability profile for each tracked source and the
            leaderboards allow sorting by, and filtering for, desired stats.
            <br />
            <br />
            All predictions are categorized by subject, accuracy, status and
            source for easy recall and the original content is provided in the
            same media format that it was published. Relevant segments from long
            form videos like podcasts are perfectly clipped and instantly
            accessible in the embedded replayer. Summaries of long form content
            are also available allowing users to consume hours worth of video in
            just minutes!
          </span>
        </div>
        <div className="flex gap-4 flex-col items-center pt-8">
          <h2 className="text-white text-3xl font-raleway font-semibold">
            Why we do it
          </h2>
          <span className="text-xl font-raleway text-primary400">
            Our mission is to empower seekers and purveyors of wisdom.
          </span>
          <span className="text-[#ffffff80] text-center font-poppins">
            In today’s world, the sheer volume of daily generated content makes
            it difficult to distinguish genuine insights from the prevailing
            noise. With the rise of AI-generated content, it's never been more
            challenging to find reliable information. Anyone who spends any time
            online knows firsthand how often what we click on turns out to be
            clickbait or misguided and at times even misleading information.
            Consuming it is only made more painful by the fact that genuinely
            valuable insights are simultaneously being missed out on.
            <br />
            <br />
            Lucky or Genius scours through countless hours of content from
            user-selected publishers and creators allowing our users to
            effortlessly identify and prioritize high quality, actionable
            insights and avoid the rest. By scoring and ranking content creators
            on their historical accuracy, we provide a clear, unbiased measure
            of their prognostic ability. This allows users to compare different
            sources at a glance and make informed decisions about which insights
            to trust.
            <br />
            <br />
            By introducing accountability to the world of journalism,
            influencers and public figures, we strive to empower the people that
            rely on these sources to form their decisions about the future. Our
            goal is to create an environment where content creators are
            incentivized to be more responsible and accurate in what they share
            with their audiences. By allowing users to filter for voices with
            high accountability scores, we seek to shift the online landscape of
            discourse and influence towards a culture that values and rewards
            wisdom over hype.
          </span>
        </div>
        <div className="flex gap-4 flex-col items-center pt-8">
          <h2 className="text-white text-3xl font-raleway font-semibold">
            Our Vision
          </h2>
          <span className="text-[#ffffff80] text-center font-poppins">
            At Lucky or Genius, we envision a world where reputations earned
            over lifetimes are instantly verifiable. In an era where information
            is generated faster than we can consume, we believe the key to
            staying well informed lies in the ability to effortlessly filter out
            irrelevant and low-value content. Because we all have different
            interests, opinions and risk appetites, we believe that the power to
            filter should lie in the hands of each individual audience member.
            <br />
            <br />
            We see decentralized censorship as the only alternative to
            centralized censorship. When everyone has the power to choose
            exactly what info they see, from whom and why they see it, the
            argument for centrally censoring information loses all validity.
            This alternative is only feasible if enough people are interested in
            maintaining their sovereignty over what they get and don’t get to
            see.
            <br />
            <br />
            Lucky or Genius is more than just a platform; it's a movement
            towards a more trustworthy and reliable digital world. Join us in
            improving the quality of online discourse by giving your attention
            to those who deserve it. Let us help you determine exactly who that
            is.
          </span>
        </div>
      </div>
    </div>
  );
};

export default About;
