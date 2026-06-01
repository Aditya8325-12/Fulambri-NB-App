import axios from "axios";
import Toast from "react-native-toast-message";

export const handleAxiosError = (err: unknown, rejectVal: (value: { message: string }) => any, defaultMessage: string) => {
    if (axios.isAxiosError(err)) {
        if (err.response?.data?.errors && Array.isArray(err.response.data.errors) && err.response.data.errors.length > 0) {
            const firstError = err.response.data.errors[0];
            const message = `${firstError.field} ${firstError.message}`
            Toast.show({ type: "error", text1: firstError.field, text2: firstError.message });
            return rejectVal({ message });
        }
        const message = err.response?.data?.message || defaultMessage;
        Toast.show({ type: "error", text1: message });
        return rejectVal({ message })
    }
    const fallbackMessage = "Server not reachable. Please try again leter";
    Toast.show({ type: "error", text1: fallbackMessage });
    return rejectVal({ message: fallbackMessage })
} 