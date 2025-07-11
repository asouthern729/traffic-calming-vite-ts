import React from "react"
import * as AppActions from '@/context/App/AppActions'
import { authHeaders } from "@/helpers/utils"
import { errorPopup } from "@/utils/Toast/Toast"

// Types
import * as AppTypes from '@/context/App/types'

export const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, onComplete: (addresses: AppTypes.RespondentCreateInterface[]) => void, token: string) => {
  const file = e.target.files?.length ? e.target.files[0] : null
  const reader = new FileReader()

  reader.onload = async (e) => {
    const contents = e.target?.result?.toString()
    const rows = contents?.split('\r\n').splice(1) // Omit first row / header
    const array = rows?.map(row => row.split(',')) || []
    const addrkeys: string[] = []

    if(rows?.length) {
      array.forEach(row => {
        if(row.length === 1) {
          addrkeys.push(row[0])
        }
      })
    }

    const result = await AppActions.searchByADDRKEY(addrkeys, authHeaders(token))

    if(!result.success) {
      return errorPopup(result.msg || 'Something Went Wrong')
    }

    const newRespondents: AppTypes.RespondentCreateInterface[] = result.data.map(item => ({ ...item, parentId: '' }))

    onComplete(newRespondents)
  }

  reader.readAsText(file as File)
}