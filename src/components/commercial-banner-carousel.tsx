'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Box, Button, Chip, Typography } from '@mui/material';

const slides = [
  {
    id: 'spring-deal',
    title: 'Campanie Primavara -20%',
    subtitle: 'La seturi selectate de anvelope agricole second hand.',
    cta: 'Vezi promotiile',
    accent: '#3c6e47',
    bg: 'linear-gradient(120deg, #e6f3e7 0%, #f4f1e7 100%)',
    image: '/images/offers/spring-offer.svg',
  },
  {
    id: 'fleet-offer',
    title: 'Oferta Flote & Utilaje',
    subtitle: 'Discount comercial pentru comenzi multiple.',
    cta: 'Solicita oferta',
    accent: '#2f5f95',
    bg: 'linear-gradient(120deg, #e6eef9 0%, #f4f1e7 100%)',
    image: '/images/offers/fleet-offer.svg',
  },
  {
    id: 'quick-delivery',
    title: 'Livrare Rapida in Toata Tara',
    subtitle: 'Comenzile confirmate pana la 14:00 pleaca in aceeasi zi.',
    cta: 'Comanda acum',
    accent: '#915f1f',
    bg: 'linear-gradient(120deg, #f8ecd9 0%, #f4f1e7 100%)',
    image: '/images/offers/delivery-offer.svg',
  },
];

export function CommercialBannerCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);

    const autoPlay = setInterval(() => {
      emblaApi.scrollNext();
    }, 5500);

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
      clearInterval(autoPlay);
    };
  }, [emblaApi]);

  return (
    <Box
      sx={{
        border: '1px solid var(--line)',
        borderRadius: 'var(--radius-lg)',
        background: 'var(--surface)',
        p: { xs: 1.2, md: 1.8 },
        boxShadow: 'var(--shadow)',
      }}
      className="reveal-up"
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 1.2,
          gap: 1,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Oferte Comerciale
        </Typography>
        <Box sx={{ display: 'flex', gap: 1.2, alignItems: 'center' }}>
          <Box sx={{ display: 'flex', gap: 0.6 }}>
            {slides.map((slide, index) => (
              <Box
                key={slide.id}
                component="button"
                onClick={() => emblaApi?.scrollTo(index)}
                aria-label={`Mergi la slide-ul ${index + 1}`}
                sx={{
                  border: 'none',
                  p: 0,
                  width: selectedIndex === index ? 22 : 10,
                  height: 10,
                  borderRadius: '999px',
                  bgcolor: selectedIndex === index ? 'var(--accent)' : 'var(--line)',
                  transition: 'all 180ms ease',
                  cursor: 'pointer',
                }}
              />
            ))}
          </Box>
          <Button
            variant="outlined"
            size="small"
            onClick={() => emblaApi?.scrollPrev()}
            sx={{ minWidth: 44, borderRadius: '999px' }}
          >
            {'<'}
          </Button>
          <Button
            variant="outlined"
            size="small"
            onClick={() => emblaApi?.scrollNext()}
            sx={{ minWidth: 44, borderRadius: '999px' }}
          >
            {'>'}
          </Button>
        </Box>
      </Box>

      <Box sx={{ overflow: 'hidden' }} ref={emblaRef}>
        <Box sx={{ display: 'flex' }}>
          {slides.map((slide) => (
            <Box
              key={slide.id}
              sx={{
                flex: '0 0 100%',
                minWidth: 0,
                pr: 1,
              }}
            >
              <Box
                sx={{
                  borderRadius: '16px',
                  border: '1px solid var(--line)',
                  p: { xs: 1.4, md: 2 },
                  background: slide.bg,
                  minHeight: { xs: 280, md: 320 },
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', md: '1.1fr 0.9fr' },
                  alignItems: 'stretch',
                  gap: { xs: 1.4, md: 2 },
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <Chip
                    label="Promotie"
                    size="small"
                    sx={{
                      mb: 1,
                      bgcolor: slide.accent,
                      color: '#fff',
                      fontWeight: 700,
                      width: 'fit-content',
                    }}
                  />
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 800,
                      color: slide.accent,
                      lineHeight: 1.15,
                      mb: 0.8,
                      fontSize: { xs: '1.35rem', md: '1.95rem' },
                    }}
                  >
                    {slide.title}
                  </Typography>
                  <Typography sx={{ color: 'var(--ink-soft)', mb: 1.4, maxWidth: 520 }}>
                    {slide.subtitle}
                  </Typography>
                  <Button
                    href="/contact"
                    variant="contained"
                    sx={{
                      borderRadius: '999px',
                      bgcolor: slide.accent,
                      textTransform: 'none',
                      fontWeight: 700,
                      width: 'fit-content',
                      px: 2.4,
                      py: 0.9,
                    }}
                  >
                    {slide.cta}
                  </Button>
                </Box>

                <Box
                  sx={{
                    position: 'relative',
                    minHeight: { xs: 140, md: 260 },
                    borderRadius: '14px',
                    overflow: 'hidden',
                    border: '1px solid rgba(255, 255, 255, 0.35)',
                    boxShadow: '0 8px 24px rgba(10, 18, 12, 0.14)',
                    width: '100%',
                  }}
                >
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    sizes="(max-width: 900px) 100vw, 35vw"
                    style={{ objectFit: 'cover' }}
                  />
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
