export const ALIEN_INFO_MAPPINGS: Record<string, string> = {
  "#space-black-hole":
    "Exploring a black hole MIGHT be a bad idea, are you sure you want to proceed?",
  "#asteroid":
    "Wow, an asteroid just crash landed on that planet!  Want to check out the crash site?",
  "#star":
    "That's an M class star, the smallest and most common type of star. Still we shouldn't get too close.",
  "#space-whale":
    "Holy moly!  A space whale!  It looks friendly - shall we try talk to them?",
  "#satellite":
    "There might be something interesting on that abandoned satellite.",
  "#spaceship": "That's our spaceship, pretty slick!",
  "space-station":
    "That space station looks inhabited, might be a good place to trade.",
  "#red-planet":
    "That planet doesn't look inhabited - but you never know. Shall we prepare for landing?",
  "#cyan-door":
    "Want to know more about the creator of this station?  Go through this door",
  "#red-door": "You&apos;ll find some information about other projects here",
  "#yellow-door":
    "This is the information center, check out the captains log here",
  "#space-whale-space-scene":
    "Wow, I never dreamed I'd see a space whale up close - truly majestic creatures!",
  "#black-hole-space-scene":
    "I&apos;ve always been fascinated by black holes, some say each block hole creates a new universe!",
  "#star-space-scene":
    "Ah stars, it&apos; what we&apos;re all made of.  Makes me feel small and meaningless and yet part of something bigger",
  "#infected-station-space-scene":
    "Euuh, that guy doesn't look too friendly... let&apos;s give this one a miss?",
  "#captains-log-button": "Captain&apos;s log",
  "#control-coming-soon":
    "We have some room in our hold, we'll have to find something to store here.",
  "#one-button": "Not quite sure what these do...",
  "#home-btn": "Want to get out of here?",
  "#email-me-btn": "Get in touch here",
  "#back-btn": "Return to our ship?",
  "#control-design": "We've got some info on the ship's design here.",
  "#control-bio":
    "I've hacked the emperial network, let's see what they have on our captain.",
  "#control-projects":
    "I've kept a record of the captain's projects here.  See what he's been working on for the past few years.",
  "#control-log": "Want to access the captain's log?",
  "#lightspeed-btn": "Click here if you want to go really really fast!",
  "#rotate-icon": "Turn things sideways.",
  "#mode-switcher": "You can toggle the orientation here.",
  "#sonar-container": "This is purely decorative... in other words - useless",
  "#spaceship-monitor":
    "This is a display, it displays... stuff... It can also be used to watch 1980's broadcast TV.  Yep it's just reaching us now.",
  "#scene-control-silence-btn":
    "You can toggle me here, that's toggle not tickle.",
  "#space-station":
    "I'm not getting any response from that space station, shall we take a closer look?",
};

export const complexSpaceElements = {
  lightspeedButton: {
    selector: "#lightspeed-btn",
    sceneText: {
      default: "Lightspeed!",
      spaceship: "Lightspeed!",
      spacestation: null,
      blackhole:
        "You really do have a death wish don&apos;t you!  We're only 120AU&apos;s from the event horizon!",
      star: "You want to go to lightspeed while facing a class III giant star?  Smart, real smart... ",
      spacewhale:
        "How about trying NOT to disturb one of the most amazing creatures in the universe?",
    },
  },
};
