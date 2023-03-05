export const RECRUIT_TYPES_CONST = {
  New: 'new',
  Pickup: 'pickup',
  Popular: 'popular',
} as const

export type RecruitTypeKeys = keyof typeof RECRUIT_TYPES_CONST
export type RecruitTypeValue = typeof RECRUIT_TYPES_CONST[RecruitTypeKeys]

/** statusに紐づいた色を返す */
export const MAPPED_RECRUIT_TYPE_COLOR: {
  [key in RecruitTypeValue]: string
} = {
  [RECRUIT_TYPES_CONST.New]: 'pink',
  [RECRUIT_TYPES_CONST.Pickup]: 'green',
  [RECRUIT_TYPES_CONST.Popular]: 'orange',
}

/************************* master系 *************************/
export const MAPPED_RECRUIT_TYPE_LABEL: {
  [key in RecruitTypeValue]: string
} = {
  [RECRUIT_TYPES_CONST.New]: 'NEW',
  [RECRUIT_TYPES_CONST.Pickup]: 'Pickup',
  [RECRUIT_TYPES_CONST.Popular]: '人気',
}

export const RECRUIT_SELECT_OPTIONS = [
  {
    value: RECRUIT_TYPES_CONST.New,
    label: MAPPED_RECRUIT_TYPE_LABEL[RECRUIT_TYPES_CONST.New],
  },
  {
    value: RECRUIT_TYPES_CONST.Pickup,
    label: MAPPED_RECRUIT_TYPE_LABEL[RECRUIT_TYPES_CONST.Pickup],
  },
  {
    value: RECRUIT_TYPES_CONST.Popular,
    label: MAPPED_RECRUIT_TYPE_LABEL[RECRUIT_TYPES_CONST.Popular],
  },
]

export const MAPPED_TODO_PRIORITY_LABEL = (priorityLabel: number) => {
  return `優先度${priorityLabel + 1}`
}
