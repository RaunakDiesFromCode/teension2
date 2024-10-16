import { Prisma } from "@prisma/client";

export function getUserDataSelect(loggedInUserId: string) {
  return {
    id: true,
    username: true,
    displayName: true,
    avatarUrl: true,
    coverUrl: true,
    bio: true,
    badge: true,
    stars: true,
    tribe: true,
    createdAt: true,
    followers: {
      where: {
        followerId: loggedInUserId,
      },
      select: {
        followerId: true,
      },
    },
    _count: {
      select: {
        posts: true,
        followers: true,
      },
    },
  } satisfies Prisma.UserSelect;
}

export function getPostDataInclude(loggedInUserId: string) {
  return {
    user: {
      select: getUserDataSelect(loggedInUserId),
    },
    attachments: true,
    likes: {
      where: {
        userId: loggedInUserId,
      },
      select: {
        userId: true,
      },
    },
    _count: {
      select: {
        likes: true,
        comments: true,
      },
    },
  } satisfies Prisma.PostInclude;
}

export type PostData = Prisma.PostGetPayload<{
  include: ReturnType<typeof getPostDataInclude>;
}>;

export interface PostsPage {
  posts: PostData[];
  nextCursor: string | null;
}

export function getCommentDataInclude(loggedInUserId: string) {
  return {
    user: {
      select: getUserDataSelect(loggedInUserId),
    },
  } satisfies Prisma.CommentInclude;
}

export type CommentData = Prisma.CommentGetPayload<{
  include: ReturnType<typeof getCommentDataInclude>;
}>;

export interface CommentsPage {
  comments: CommentData[];
  previousCursor: string | null;
}

export const notificationInclude = {
  issuer: {
    select: {
      username: true,
      displayName: true,
      avatarUrl: true,
    },
  },
  post: {
    select: {
      content: true,
    },
  },
} satisfies Prisma.NotificationInclude;

export type NotificationData = Prisma.NotificationGetPayload<{
  include: typeof notificationInclude;
}>;

export interface NotificationsPage {
  notifications: NotificationData[];
  nextCursor: string | null;
}

export interface FollowerInfo {
  followers: number;
  isFollowedByUser: boolean;
}

export interface LikeInfo {
  likes: number;
  isLikedByUser: boolean;
}

export type UserData = Prisma.UserGetPayload<{
  select: ReturnType<typeof getUserDataSelect>;
}>;

export interface NotificationCountInfo {
  unreadCount: number;
}

export interface MessageCountInfo {
  unreadCount: number;
}

export interface TribeInfo {
  tribe: string;
}

export type Tribe =
  | "Ateredes"
  | "Covenant"
  | "Thunderbolt"
  | "Gryffindor"
  | "Fraternity"
  | "Hunted"
  | "Highness"
  | "Jedi";

export type Question = {
  question: string;
  options: { label: string; value: string }[];
  mapping: { [key: string]: Tribe };
};

export const questions: Question[] = [
  {
    question: "How do you handle defeat?",
    options: [
      {
        label: "I feel determined to fight back and win next time.",
        value: "A",
      },
      { label: "I listen to my leader's advice and move on.", value: "B" },
      { label: "I get frustrated and might break things.", value: "C" },
      {
        label:
          "I analyze what went wrong and make a plan to succeed next time.",
        value: "D",
      },
      {
        label: "I gather my friends and support each other, win or lose.",
        value: "E",
      },
      {
        label: "I don't care about the rules; I just follow my own vision.",
        value: "F",
      },
      {
        label: "I continue to lead confidently, regardless of the outcome.",
        value: "G",
      },
      {
        label:
          "I reflect, learn from the experience, and prepare for future challenges.",
        value: "H",
      },
    ],
    mapping: {
      A: "Ateredes",
      B: "Covenant",
      C: "Thunderbolt",
      D: "Gryffindor",
      E: "Fraternity",
      F: "Hunted",
      G: "Highness",
      H: "Jedi",
    },
  },
  {
    question: "How important is teamwork to you?",
    options: [
      { label: "I prefer to lead, but I’m open to teamwork.", value: "A" },
      { label: "I trust my superiors and work well in a team.", value: "B" },
      { label: "Teamwork is secondary; I rely on my strength.", value: "C" },
      {
        label: "Teamwork is crucial; it ensures success in the long run.",
        value: "D",
      },
      { label: "Teamwork is everything to me.", value: "E" },
      {
        label: "I prefer working alone or with a small, loyal group.",
        value: "F",
      },
      {
        label:
          "Teamwork is important, but I’m comfortable making solo decisions.",
        value: "G",
      },
      { label: "I value teaching and working alongside others.", value: "H" },
    ],
    mapping: {
      A: "Ateredes",
      B: "Covenant",
      C: "Thunderbolt",
      D: "Gryffindor",
      E: "Fraternity",
      F: "Hunted",
      G: "Highness",
      H: "Jedi",
    },
  },
  {
    question: "How do you handle power?",
    options: [
      {
        label: "I have power but sometimes struggle to use it effectively.",
        value: "A",
      },
      { label: "I follow the guidance of those in power.", value: "B" },
      {
        label: "I have power but lack the finesse to use it constructively.",
        value: "C",
      },
      { label: "I use power wisely and strategically.", value: "D" },
      { label: "I believe in the collective power of a group.", value: "E" },
      {
        label: "I use my power to challenge and change the system.",
        value: "F",
      },
      { label: "I wield power confidently and assertively.", value: "G" },
      {
        label: "I use power responsibly and with respect for tradition.",
        value: "H",
      },
    ],
    mapping: {
      A: "Ateredes",
      B: "Covenant",
      C: "Thunderbolt",
      D: "Gryffindor",
      E: "Fraternity",
      F: "Hunted",
      G: "Highness",
      H: "Jedi",
    },
  },
  {
    question: "What motivates you the most?",
    options: [
      { label: "The desire to prove myself after a loss.", value: "A" },
      { label: "The approval and direction of my superiors.", value: "B" },
      { label: "The need to express my strength and capability.", value: "C" },
      { label: "The pursuit of knowledge and eventual success.", value: "D" },
      { label: "The bonds of friendship and unity.", value: "E" },
      {
        label: "The pursuit of justice and rebellion against oppression.",
        value: "F",
      },
      {
        label: "The responsibility of leadership and being seen as a hero.",
        value: "G",
      },
      {
        label: "The legacy and teachings of those who came before me.",
        value: "H",
      },
    ],
    mapping: {
      A: "Ateredes",
      B: "Covenant",
      C: "Thunderbolt",
      D: "Gryffindor",
      E: "Fraternity",
      F: "Hunted",
      G: "Highness",
      H: "Jedi",
    },
  },
  {
    question: "How do you view rules and authority?",
    options: [
      {
        label: "I respect authority but struggle with rules sometimes.",
        value: "A",
      },
      {
        label: "I follow rules and respect authority without question.",
        value: "B",
      },
      {
        label: "Rules are often a hindrance; I rely on my strength.",
        value: "C",
      },
      { label: "I follow rules but think critically about them.", value: "D" },
      {
        label: "Rules are less important than our collective unity.",
        value: "E",
      },
      { label: "I challenge and break rules if they are unjust.", value: "F" },
      { label: "I create and enforce rules as a leader.", value: "G" },
      {
        label: "I respect rules but adapt them to fit my teachings.",
        value: "H",
      },
    ],
    mapping: {
      A: "Ateredes",
      B: "Covenant",
      C: "Thunderbolt",
      D: "Gryffindor",
      E: "Fraternity",
      F: "Hunted",
      G: "Highness",
      H: "Jedi",
    },
  },
];

export const tribesInfo: { [key in Tribe]: string } & {
  [key: string]: string;
} = {
  Ateredes:
    "With power in their hands, they rise anew, In the face of defeat, their courage grew.",
  Covenant:
    "Faithful hearts, in unity they stand, Yet some seek freedom, a rebel's hand.",
  Thunderbolt:
    "Strength to shatter, yet gentle hearts, They break to rebuild, a fresh start.",
  Gryffindor:
    "With wisdom and strength, they pave their way, Steadily climbing, to victory's day.",
  Fraternity:
    "Together they thrive, through thick and thin, In unity, their battles they win.",
  Hunted:
    "Outlaws with visions, bold and free, Like Robin Hood, in dreams they see.",
  Highness:
    "They rule with might, in glory’s radiant light, Heroes to some, a noble sight.",
  Jedi: "Rarest of all, with a legacy grand, They fight, they teach, with wisdom's hand.",
};
