"use client";
import { getCartItem } from "@/api/services/cart/cart.services";
import { SearchProductApi } from "@/api/services/product/product.services";
import { token } from "@/api/token";
import { searchProductType } from "@/type/product.type";
import { Star } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ChatDrawer } from "./ChatDrawer";

function Navbar() {
  const IconSearch = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );

  const IconCart = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );

  const IconHeart = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );

  const IconUser = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );

  const IconMenu = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );

  const IconX = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [countCart, setCountCart] = useState(0);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchedProducts, setSearchedProducts] = useState<searchProductType[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(false);
  const [unreadChat, setUnreadChat] = useState(0);

  const handleLogout = () => {
    token.clear();
    <a href="/auth/login"></a>;
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fetchCart = async () => {
    try {
      const res = await getCartItem();
      setCountCart(res.items.length);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCart();

    window.addEventListener("cartUpdated", fetchCart);

    return () => {
      window.removeEventListener("cartUpdated", fetchCart);
    };
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.trim().length > 0) {
        setIsLoading(true);
        SearchProductApi(searchQuery)
          .then((res) => {
            setSearchedProducts(res);
          })
          .catch((err) => console.error(err))
          .finally(() => setIsLoading(false));
      } else {
        setSearchedProducts([]);
      }
    }, 400); // Tunggu 400ms setelah user berhenti mengetik

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  useEffect(() => {
    const handleNewMessage = () => {
      setIsChatOpen((currentState) => {
        if (!currentState) {
          setUnreadChat((prev) => prev + 1);
        }
        return currentState;
      });
    };

    // Pastikan menggunakan window
    window.addEventListener("newMessageReceived", handleNewMessage);

    return () => {
      window.removeEventListener("newMessageReceived", handleNewMessage);
    };
  }, []);

  useEffect(() => {
    if (isChatOpen) {
      setUnreadChat(0);
    }
  }, [isChatOpen]);

  const handleCloseSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery("");
    setSearchedProducts([]);
  };

  return (
    <div className="pb-14 bg-white font-sans text-zinc-900">
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-500 flex items-center ${
          isScrolled
            ? "bg-white/90 backdrop-blur-xl border-b border-zinc-100 h-16 shadow-sm"
            : "bg-transparent h-24"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between relative">
          <nav className="hidden lg:flex items-center gap-10">
            <a
              href="/product"
              className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 hover:text-zinc-900 transition-colors"
            >
              Home
            </a>
            <a
              href="#"
              className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 hover:text-zinc-900 transition-colors"
            >
              Collections
            </a>
          </nav>

          {/* Mobile: Menu Toggle */}
          <button className="lg:hidden p-2 text-zinc-900 hover:bg-zinc-100 rounded-full transition-colors">
            <IconMenu />
          </button>

          {/* Center: Brand Logo */}
          <a
            href="/"
            className={`absolute left-1/2 -translate-x-1/2 text-xl font-black tracking-[0.6em] uppercase transition-all duration-500 ${
              isScrolled ? "scale-90" : "scale-100"
            }`}
          >
            VANTAGE
          </a>

          {/* Right: Actions */}
          <div className="flex items-center gap-1 md:gap-4">
            {/* Search Toggle */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-zinc-900 hover:bg-zinc-100 rounded-full transition-colors"
              aria-label="Search"
            >
              <IconSearch />
            </button>

            {/* Wishlist */}
            <a
              href="/wishlist"
              className="hidden sm:block p-2 text-zinc-900 hover:bg-zinc-100 rounded-full transition-colors"
            >
              <IconHeart />
            </a>

            <button
              onClick={() => setIsChatOpen(true)}
              className="relative p-2 hover:bg-zinc-100 rounded-full transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              {unreadChat > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-zinc-900 text-[8px] text-white font-bold animate-bounce">
                  {unreadChat}
                </span>
              )}
              {unreadChat === 0 && (
                <span className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-zinc-300"></span>
              )}
            </button>

            {/* Cart */}
            <a
              href="/cart"
              className="relative p-2 text-zinc-900 hover:bg-zinc-100 rounded-full transition-colors"
            >
              <IconCart />
              {countCart > 0 && (
                <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-zinc-900 text-[8px] text-white font-bold">
                  {countCart}
                </span>
              )}
            </a>

            <div className="h-4 w-[1px] bg-zinc-200 mx-1 hidden sm:block" />

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="p-2 text-zinc-900 hover:bg-zinc-100 rounded-full transition-colors"
              >
                <IconUser />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-4 w-56 bg-white rounded-xl shadow-2xl border border-zinc-100 py-2 animate-in fade-in zoom-in duration-200 origin-top-right">
                  <div className="px-4 py-2 border-b border-zinc-50">
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                      Account
                    </p>
                  </div>
                  <a
                    href="/profile"
                    className="block px-4 py-3 text-xs font-bold hover:bg-zinc-50 transition-colors"
                  >
                    Profile
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-3 text-xs font-bold hover:bg-zinc-50 transition-colors"
                  >
                    Settings
                  </a>
                  <div className="h-[1px] bg-zinc-50 my-1" />
                  <Link
                    href="auth/login"
                    className="w-full text-left px-4 py-3 text-xs font-black text-red-500 hover:bg-red-50 transition-colors uppercase tracking-widest"
                    onClick={handleLogout}
                  >
                    Sign Out
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <ChatDrawer isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

      {/* Full-screen Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[100] bg-white animate-in fade-in slide-in-from-top duration-500 flex flex-col overflow-hidden">
          <div className="container mx-auto px-6 py-12 flex flex-col h-full">
            {/* Header Overlay */}
            <div className="flex justify-between items-center mb-16">
              <span className="text-xs font-black tracking-[0.5em] uppercase text-zinc-300">
                Global Search
              </span>
              <button
                onClick={handleCloseSearch}
                className="p-2 hover:bg-zinc-100 rounded-full transition-colors"
              >
                <IconX />
              </button>
            </div>

            {/* Input Search */}
            <div className="max-w-4xl mx-auto w-full">
              <div className="relative group">
                <input
                  autoFocus
                  placeholder="SEARCH VANTAGE"
                  className="w-full bg-transparent border-none text-4xl md:text-7xl font-black uppercase tracking-tighter py-6 focus:outline-none placeholder:text-zinc-100"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="absolute bottom-0 left-0 h-[3px] bg-zinc-900 w-full" />
              </div>

              {/* Results Area */}
              <div className="mt-10 overflow-y-auto max-h-[60vh] no-scrollbar">
                {isLoading && (
                  <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest animate-pulse">
                    Searching...
                  </p>
                )}

                {!isLoading && searchedProducts.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {searchedProducts.map((product) => (
                      <Link
                        key={product.id}
                        href={`/product/${product.slug}`}
                        onClick={handleCloseSearch}
                        className="flex items-center gap-6 p-4 hover:bg-zinc-50 transition-all border border-transparent hover:border-zinc-100 rounded-xl group"
                      >
                        <div className="w-20 h-20 bg-zinc-100 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={product.images[0]?.url || "/images/image.jpg"}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <div className="flex flex-col">
                          <h3 className="text-sm font-black uppercase tracking-tight">
                            {product.name}
                          </h3>
                          <p className="text-sm font-black uppercase tracking-tight flex flex-row items-center">
                            {product.reviews.rating ?? 4}
                            <Star
                              size={14}
                              className="fill-yellow-400 text-yellow-400"
                            />{" "}
                          </p>
                          <p className="text-xs font-medium text-zinc-400">
                            Rp {product.displayPrice.toLocaleString("id-ID")}
                          </p>
                          <span className="text-[9px] font-bold text-zinc-300 uppercase mt-2 tracking-widest group-hover:text-zinc-900 transition-colors">
                            View Product →
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}

                {!isLoading &&
                  searchQuery.length > 0 &&
                  searchedProducts.length === 0 && (
                    <div className="py-20 text-center">
                      <p className="text-zinc-400 text-sm font-bold uppercase tracking-widest">
                        No products found for "{searchQuery}"
                      </p>
                    </div>
                  )}

                {searchQuery.length === 0 && (
                  <p className="text-zinc-400 text-[11px] font-bold uppercase tracking-[0.3em]">
                    Type to start searching your favorite products...
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
