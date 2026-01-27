import { create } from "zustand";
import axios from "axios";

// تنظیمات پایه axios
const api = axios.create({
  baseURL: "https://araks-web-panel-back.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Store اصلی
const useDataStore = create((set, get) => ({
  // ==================== TOURS ====================
  tours: [],
  selectedTour: null,
  toursLoading: false,
  toursError: null,

  // دریافت همه تورها
  fetchTours: async () => {
    set({ toursLoading: true, toursError: null });
    try {
      const response = await api.get("/tours");
      set({ tours: response.data, toursLoading: false });
      return response.data;
    } catch (error) {
      set({
        toursError: error.response?.data?.message || error.message,
        toursLoading: false,
      });
      throw error;
    }
  },

  // دریافت یک تور با ID
  fetchTourById: async (id) => {
    set({ toursLoading: true, toursError: null });
    try {
      const response = await api.get(`/tours/${id}`);
      set({ selectedTour: response.data, toursLoading: false });
      return response.data;
    } catch (error) {
      set({
        toursError: error.response?.data?.message || error.message,
        toursLoading: false,
      });
      throw error;
    }
  },

  // ساخت تور جدید
  createTour: async (tourData) => {
    set({ toursLoading: true, toursError: null });
    try {
      const response = await api.post("/tours", tourData);
      set((state) => ({
        tours: [...state.tours, response.data],
        toursLoading: false,
      }));
      return response.data;
    } catch (error) {
      set({
        toursError: error.response?.data?.message || error.message,
        toursLoading: false,
      });
      throw error;
    }
  },

  // بروزرسانی تور
  updateTour: async (id, tourData) => {
    set({ toursLoading: true, toursError: null });
    try {
      const response = await api.put(`/tours/${id}`, tourData);
      set((state) => ({
        tours: state.tours.map((tour) =>
          tour._id === id ? response.data : tour,
        ),
        selectedTour:
          state.selectedTour?._id === id
            ? response.data
            : state.selectedTour,
        toursLoading: false,
      }));
      return response.data;
    } catch (error) {
      set({
        toursError: error.response?.data?.message || error.message,
        toursLoading: false,
      });
      throw error;
    }
  },

  // حذف تور
  deleteTour: async (id) => {
    set({ toursLoading: true, toursError: null });
    try {
      await api.delete(`/tours/${id}`);
      set((state) => ({
        tours: state.tours.filter((tour) => tour._id !== id),
        selectedTour:
          state.selectedTour?._id === id ? null : state.selectedTour,
        toursLoading: false,
      }));
    } catch (error) {
      set({
        toursError: error.response?.data?.message || error.message,
        toursLoading: false,
      });
      throw error;
    }
  },

  // پاک کردن تور انتخاب شده
  clearSelectedTour: () => set({ selectedTour: null }),

  // ==================== STAYS ====================
  stays: [],
  selectedStay: null,
  staysLoading: false,
  staysError: null,

  // دریافت همه اقامتگاه‌ها
  fetchStays: async () => {
    set({ staysLoading: true, staysError: null });
    try {
      const response = await api.get("/stays");
      set({ stays: response.data, staysLoading: false });
      return response.data;
    } catch (error) {
      set({
        staysError: error.response?.data?.message || error.message,
        staysLoading: false,
      });
      throw error;
    }
  },

  // دریافت یک اقامتگاه با ID
  fetchStayById: async (id) => {
    set({ staysLoading: true, staysError: null });
    try {
      const response = await api.get(`/stays/${id}`);
      set({ selectedStay: response.data, staysLoading: false });
      return response.data;
    } catch (error) {
      set({
        staysError: error.response?.data?.message || error.message,
        staysLoading: false,
      });
      throw error;
    }
  },

  // ساخت اقامتگاه جدید
  createStay: async (stayData) => {
    set({ staysLoading: true, staysError: null });
    try {
      const response = await api.post("/stays", stayData);
      set((state) => ({
        stays: [...state.stays, response.data],
        staysLoading: false,
      }));
      return response.data;
    } catch (error) {
      set({
        staysError: error.response?.data?.message || error.message,
        staysLoading: false,
      });
      throw error;
    }
  },

  // بروزرسانی اقامتگاه
  updateStay: async (id, stayData) => {
    set({ staysLoading: true, staysError: null });
    try {
      const response = await api.put(`/stays/${id}`, stayData);
      set((state) => ({
        stays: state.stays.map((stay) =>
          stay._id === id ? response.data : stay,
        ),
        selectedStay:
          state.selectedStay?._id === id
            ? response.data
            : state.selectedStay,
        staysLoading: false,
      }));
      return response.data;
    } catch (error) {
      set({
        staysError: error.response?.data?.message || error.message,
        staysLoading: false,
      });
      throw error;
    }
  },

  // حذف اقامتگاه
  deleteStay: async (id) => {
    set({ staysLoading: true, staysError: null });
    try {
      await api.delete(`/stays/${id}`);
      set((state) => ({
        stays: state.stays.filter((stay) => stay._id !== id),
        selectedStay:
          state.selectedStay?._id === id ? null : state.selectedStay,
        staysLoading: false,
      }));
    } catch (error) {
      set({
        staysError: error.response?.data?.message || error.message,
        staysLoading: false,
      });
      throw error;
    }
  },

  // پاک کردن اقامتگاه انتخاب شده
  clearSelectedStay: () => set({ selectedStay: null }),

  // ==================== TRANSFERS ====================
  transfers: [],
  selectedTransfer: null,
  transfersLoading: false,
  transfersError: null,

  // دریافت همه ترانسفرها
  fetchTransfers: async () => {
    set({ transfersLoading: true, transfersError: null });
    try {
      const response = await api.get("/transfers");
      set({ transfers: response.data, transfersLoading: false });
      return response.data;
    } catch (error) {
      set({
        transfersError:
          error.response?.data?.message || error.message,
        transfersLoading: false,
      });
      throw error;
    }
  },

  // دریافت یک ترانسفر با ID
  fetchTransferById: async (id) => {
    set({ transfersLoading: true, transfersError: null });
    try {
      const response = await api.get(`/transfers/${id}`);
      set({
        selectedTransfer: response.data,
        transfersLoading: false,
      });
      return response.data;
    } catch (error) {
      set({
        transfersError:
          error.response?.data?.message || error.message,
        transfersLoading: false,
      });
      throw error;
    }
  },

  // ساخت ترانسفر جدید
  createTransfer: async (transferData) => {
    set({ transfersLoading: true, transfersError: null });
    try {
      const response = await api.post("/transfers", transferData);
      set((state) => ({
        transfers: [...state.transfers, response.data],
        transfersLoading: false,
      }));
      return response.data;
    } catch (error) {
      set({
        transfersError:
          error.response?.data?.message || error.message,
        transfersLoading: false,
      });
      throw error;
    }
  },

  // بروزرسانی ترانسفر
  updateTransfer: async (id, transferData) => {
    set({ transfersLoading: true, transfersError: null });
    try {
      const response = await api.put(
        `/transfers/${id}`,
        transferData,
      );
      set((state) => ({
        transfers: state.transfers.map((transfer) =>
          transfer._id === id ? response.data : transfer,
        ),
        selectedTransfer:
          state.selectedTransfer?._id === id
            ? response.data
            : state.selectedTransfer,
        transfersLoading: false,
      }));
      return response.data;
    } catch (error) {
      set({
        transfersError:
          error.response?.data?.message || error.message,
        transfersLoading: false,
      });
      throw error;
    }
  },

  // حذف ترانسفر
  deleteTransfer: async (id) => {
    set({ transfersLoading: true, transfersError: null });
    try {
      await api.delete(`/transfers/${id}`);
      set((state) => ({
        transfers: state.transfers.filter(
          (transfer) => transfer._id !== id,
        ),
        selectedTransfer:
          state.selectedTransfer?._id === id
            ? null
            : state.selectedTransfer,
        transfersLoading: false,
      }));
    } catch (error) {
      set({
        transfersError:
          error.response?.data?.message || error.message,
        transfersLoading: false,
      });
      throw error;
    }
  },

  // پاک کردن ترانسفر انتخاب شده
  clearSelectedTransfer: () => set({ selectedTransfer: null }),

  // ==================== GLOBAL ACTIONS ====================
  // پاک کردن همه خطاها
  clearErrors: () =>
    set({
      toursError: null,
      staysError: null,
      transfersError: null,
    }),

  // بارگذاری همه داده‌ها به صورت همزمان
  fetchAllData: async () => {
    const { fetchTours, fetchStays, fetchTransfers } = get();
    try {
      await Promise.all([
        fetchTours(),
        fetchStays(),
        fetchTransfers(),
      ]);
    } catch (error) {
      console.error("Error fetching all data:", error);
      throw error;
    }
  },
}));

export default useDataStore;
