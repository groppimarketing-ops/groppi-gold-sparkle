import { useTranslation } from 'react-i18next';
import { ArrowRight, Sparkles, Camera, Globe, ShoppingCart, Megaphone, Search, Share2, Star, RefreshCw, Brain, Rocket, Filter, FileText, Award, Smartphone, lazy, Suspense } from 'react';
import { ArrowRight, Sparkles, Camera, Globe, ShoppingCart, Megaphone, Search, Share2, Star, RefreshCw, Brain, Rocket, Filter, FileText, Award, Smartphone } from 'lucide-react';
import LangLink from '@/components/LangLink';
import { useState, useRef, lazy, Suspense } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import SectionHeader from '@/components/ui/SectionHeader';
import GlassCard from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ServiceCard, { ServiceData } from '@/components/services/ServiceCard';
import GoalBasedEntry from '@/components/services/GoalBasedEntry';
import HomeServiceMap from '@/components/home/HomeServiceMap';
import ContentCalculator from '@/components/service-page/ContentCalculator';
import PricingFAQ from '@/components/service-page/PricingFAQ';
import GeneralFAQ from '@/components/service-page/GeneralFAQ';
import ServicesFAQ from '@/components/service-page/ServicesFAQ';
import PageSEO from '@/components/seo/PageSEO';
import { BreadcrumbSchema } from '@/components/seo/StructuredData';

// Lazy-load heavy modal
const ServiceDetailModal = lazy(() => import('@/components/services/ServiceDetailModal'));
