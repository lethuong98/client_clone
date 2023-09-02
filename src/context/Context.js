"use client";
import { createContext, useContext } from "react";

export const QuickView = createContext({});

export const useQuickView = () => useContext(QuickView);
