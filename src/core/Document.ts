import type { Box } from "./Box"
import type { Email } from "./Email"

export interface Document {
  users: Email[]
  boxes: Box[]
}
