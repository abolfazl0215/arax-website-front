'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
export default function SearchSection({ 
  home, 
  activeTab, 
  setActiveTab,
  staysTypes,
  staysLocations,
  tourTypes,
  tourLocations,
  transferLocations,
  today,
  errors,
  loading,
  staysLoading,
  toursLoading,
  transfersLoading,
  handleSearch,
  showModal,
  setShowModal,
  searchResults,
  handleBooking,
  showContactModal,
  setShowContactModal,
  selectedItem
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <>
    </>
  );
}