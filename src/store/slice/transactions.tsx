import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { waitForTransactionReceipt } from "@wagmi/core"
import { createAppSlice } from "@/store/createAppSlice"
import { SCAN_URL, WAGMI_CONFIG } from "@/provider/WalletProvider"
import { toast } from "react-toastify"
import events from "@/utils/events"
import { TRANSACTION_SUCCESS_EVENT } from "@/constants"

interface Transaction {
  hash: string
  status: "pending" | "success" | "error"
  description?: string
  toastID?: string
  extra?: any
}

interface TransactionState {
  transactions: Transaction[]
}

const initialState: TransactionState = {
  transactions: [],
}

const handleGotoScan = (chainId: number) => {
  window.open(SCAN_URL[chainId])
}
export const submitTransaction = createAsyncThunk(
  "transactions/submit",
  async (
    {
      hash,
      chainId,
      description,
    }: { hash: string; description?: string; chainId: number },
    { dispatch },
  ) => {
    try {
      const receipt = await toast.promise(
        // @ts-ignore
        waitForTransactionReceipt(WAGMI_CONFIG, { hash, chainId }),
        {
          pending: description,
          success: {
            render() {
              return (
                <>
                  <div>{description}</div>
                  <div onClick={() => handleGotoScan(chainId)}>
                    View on Scan
                  </div>
                </>
              )
            },
          },
          error: description,
        },
      )
      // @ts-ignore
      if (receipt.status === "success") {
        // 交易成功，更新状态
        dispatch(updateTransaction({ hash, status: "success" }))
        events.emit(TRANSACTION_SUCCESS_EVENT, { hash, status: "success" })
      }
    } catch (error) {
      // 交易失败，更新状态
      dispatch(updateTransaction({ hash, status: "error" }))
      throw error
    }
  },
)

export const TransactionSlice = createAppSlice({
  name: "transactions",
  initialState,
  reducers: {
    addTransaction: (
      state,
      action: PayloadAction<{
        hash: string
        description?: string
        extra?: any
      }>,
    ) => {
      state.transactions.push({ ...action.payload, status: "pending" })
    },
    updateTransaction: (
      state,
      action: PayloadAction<{
        hash: string
        status: "pending" | "success" | "error"
      }>,
    ) => {
      const index = state.transactions.findIndex(
        t => t.hash === action.payload.hash,
      )
      if (index !== -1) {
        state.transactions[index].status = action.payload.status
      }
    },
  },
})

export const { addTransaction, updateTransaction } = TransactionSlice.actions

export default TransactionSlice.reducer
