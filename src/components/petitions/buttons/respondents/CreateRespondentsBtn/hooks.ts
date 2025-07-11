import React, { useCallback } from "react"
import { useEnableQuery } from "@/helpers/hooks"
import { useCreatePetitionFormCtx } from "@/components/petitions/forms/create/CreatePetitionForm/hooks"
import { handleFileSelect } from "./utils"

// Types
import * as AppTypes from '@/context/App/types'

export const useHandleFileSelect = () => {
  const { setValue, watch } = useCreatePetitionFormCtx()

  const respondents = watch('Respondents') || []

  const { enabled, token }  = useEnableQuery()

  return useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if(!enabled || !token) return

    handleFileSelect(e, (newRespondents: AppTypes.RespondentCreateInterface[]) => setValue('Respondents', [ ...respondents, ...newRespondents ]), token)
  }, [enabled, token])
}