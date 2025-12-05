// hooks/use-cart.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Product } from "@/types";
import toast from "react-hot-toast";

interface CartStore {
    items: Product[];
    addItem: (data: Product) => void;
    removeItem: (id: number) => void; // <--- تغییر ۱: اینجا باید number باشه
    removeAll: () => void;
}

const useCart = create(
    persist<CartStore>(
        (set, get) => ({
            items: [],

            addItem: (data: Product) => {
                const currentItems = get().items;
                // چون هر دو number هستند، مقایسه درست انجام میشه
                const existingItem = currentItems.find((item) => item.id === data.id);

                if (existingItem) {
                    return toast("این محصول قبلاً در سبد وجود دارد");
                }

                set({ items: [...get().items, data] });
                toast.success("به سبد خرید اضافه شد");
            },

            removeItem: (id: number) => { // <--- تغییر ۲: اینجا هم باید number باشه
                // حالا ارور رفع میشه چون number با number مقایسه میشه
                set({ items: [...get().items.filter((item) => item.id !== id)] });
            },

            removeAll: () => set({ items: [] }),
        }),
        {
            name: "cart-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useCart;