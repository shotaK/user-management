import { ComponentType } from 'react'

export type PropsType<T> = T extends ComponentType<infer P> ? P : never
