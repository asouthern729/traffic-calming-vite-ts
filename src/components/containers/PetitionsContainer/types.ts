// Types
import { Petition } from "../../../context/App/types";

export interface PetitionsContainerProps { // PetitionsContainer props
  petitions: Petition[]
}

export interface PetitionsContainerState { // PetitionsContainer state obj
  hideClosed: boolean
}