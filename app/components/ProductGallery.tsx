import {Image, MediaFile, Video, ModelViewer} from '@shopify/hydrogen';
import type {Dispatch, ReactNode, RefObject} from 'react';
import React, {useEffect, useRef, useState} from 'react';
import {AnimatePresence, m} from 'framer-motion';
import {clearAllBodyScrollLocks, disableBodyScroll} from 'body-scroll-lock';
import {useNavigation} from '@remix-run/react';

import {notEmpty} from '~/lib/types.d';
// import {Carousel} from '~/components/Carousel';
import {IconClose} from '~/components/Icon';
import type {MediaFragment} from '~/__generated__/storefrontapi.generated';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselWithCounter,
} from '~/components/ui/carousel';

/**
 * A client component that defines a media gallery for hosting images, 3D models, and videos of products
 */
export function ProductGallery({media}: {media: MediaFragment[]}) {
  const [modalIdx, setModalIdx] = useState<number>(0);
  const modalRef = useRef<HTMLDivElement>(null);
  if (!media.length) {
    return null;
  }
  // const model = media.filter((med) => med.__typename === 'Model3d');

  // if (model[0] && model[0].__typename === 'Model3d') {
  //   return <ModelViewer data={model[0]} />;
  // }
  // const images = media
  //   .map((med, i) => {
  //     const image =
  //       med.__typename === 'MediaImage' && med?.image?.url
  //         ? {...med.image, altText: med.alt || ''}
  //         : null;
  //     return image ? {id: med.id || image?.id, image} : null;
  //   })
  //   .filter(notEmpty);
  return (
    <div>
      <ProductModal
        modalRef={modalRef}
        modalIdx={modalIdx}
        setModalIdx={setModalIdx}
      >
        {media.map((data, idx) => (
          <ModalImage
            key={`modal-image--${data.id}`}
            modalRef={modalRef}
            modalIdx={modalIdx}
            idx={idx + 1}
          >
            {data.__typename === 'MediaImage' && data.image && (
              <Image
                loading={'lazy'}
                data={data.image}
                aspectRatio={'4/5'}
                sizes={'(min-width: 48em) 100vw, 100vw'}
                className="object-cover w-full h-full  fadeIn"
              />
            )}
            {data.__typename === 'Video' && (
              <Video
                className="object-cover w-full h-full  fadeIn"
                autoPlay
                muted
                controls={false}
                data={data}
              />
            )}
          </ModalImage>
        ))}
      </ProductModal>
      <div className={'md:hidden'}>
        <CarouselWithCounter>
          <CarouselContent>
            {media.map((data, i) => {
              return data.__typename === 'MediaImage' && data.image ? (
                <CarouselItem key={data.id} className={'aspect-[4/5]'}>
                  <Image
                    loading={i === 0 ? 'eager' : 'lazy'}
                    data={data.image}
                    aspectRatio="4/5"
                    sizes={'(min-width: 48em) 60vw, 100vw'}
                    className="object-cover flex-1"
                  />
                </CarouselItem>
              ) : (
                data.__typename === 'Video' && (
                  <Video
                    className="object-cover w-full h-full  fadeIn"
                    autoPlay
                    muted
                    controls={false}
                    data={data}
                  />
                )
              );
            })}
          </CarouselContent>
          <CarouselPrevious isInline={true} />
          <CarouselNext isInline={true} />
        </CarouselWithCounter>
      </div>
      <div className="hidden w-full md:grid gap-y-12 xl:col-start-2 col-span-6  xl:col-span-5">
        {media.map((data, i) => {
          return data.__typename === 'Model3d' ? (
            <div key={data.id} className={'md:col-span-2 aspect-[9/16]'}>
              <ModelViewer
                camera-controls
                touch-action="pan-y"
                autoplay
                animation-name="Running"
                ar
                ar-modes="webxr scene-viewer"
                shadow-intensity="1"
                exposure={0.75}
                camera-orbit="9.698deg 72.69deg 2m"
                disable-tap
                className="object-cover w-full h-full  fadeIn"
                data={data}
              />
            </div>
          ) : (
            <button
              onClick={() => setModalIdx(i + 1)}
              className={
                'md:col-span-2 aspect-[4/5] snap-center card-image bg-white dark:bg-background/10 w-mobileGallery md:w-full crosshair-plus'
              }
              key={data.id}
            >
              {data.__typename === 'MediaImage' && data.image && (
                <Image
                  loading={i === 0 ? 'eager' : 'lazy'}
                  data={data.image}
                  aspectRatio={'4/5'}
                  sizes={'(min-width: 48em) 50vw, 100vw'}
                  className="object-cover w-full h-full  fadeIn"
                />
              )}
              {data.__typename === 'Video' && (
                <Video
                  className="object-cover w-full h-full  fadeIn"
                  autoPlay
                  muted
                  controls={false}
                  data={data}
                />
              )}

              {/*<Image*/}
              {/*  loading={i === 0 ? 'eager' : 'lazy'}*/}
              {/*  data={data.image}*/}
              {/*  aspectRatio="4/5"*/}
              {/*  sizes={'(min-width: 48em) 60vw, 90vw'}*/}
              {/*  className="object-cover w-full h-full  fadeIn"*/}
              {/*/>*/}
              {/*<MediaFile*/}
              {/*  data={data}*/}
              {/*  className={'object-cover w-full h-full fadeIn'}*/}
              {/*/>*/}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export const ProductModal = ({
  setModalIdx,
  modalIdx,
  children,
  modalRef,
}: {
  children: ReactNode;
  setModalIdx: Dispatch<number>;
  modalIdx: number;
  modalRef: RefObject<HTMLDivElement>;
}) => {
  const {location} = useNavigation();
  useEffect(() => {
    if (!modalRef.current) return;
    if (modalIdx) {
      disableBodyScroll(modalRef.current, {reserveScrollBarGap: true});
    } else {
      clearAllBodyScrollLocks();
    }
  }, [modalIdx]);
  useEffect(() => {
    clearAllBodyScrollLocks();
  }, [location]);
  return (
    <AnimatePresence>
      {modalIdx && (
        <m.div
          onClick={() => setModalIdx(0)}
          ref={modalRef}
          className={' fixed left-0 top-0 w-full z-50 h-full overflow-y-auto'}
        >
          <button
            aria-label="Close panel"
            className={'fixed right-8 top-6 cursor-pointer z-20'}
            onClick={() => setModalIdx(0)}
          >
            <IconClose width={25} height={24} viewBox="0 0 25 24" />
          </button>
          <div className={'w-full'}>{children}</div>
        </m.div>
      )}
    </AnimatePresence>
  );
};

const ModalImage = ({
  idx,
  modalIdx,
  modalRef,
  children,
}: {
  modalRef: RefObject<HTMLDivElement>;
  idx: number;
  modalIdx: number;
  children: ReactNode;
}) => {
  const imgRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!imgRef.current || !modalRef.current) return;
    if (idx === modalIdx) {
      modalRef.current.scrollTop = imgRef.current.offsetTop;
    }
  }, [modalIdx]);
  return (
    <div
      ref={imgRef}
      className={
        'md:col-span-2 card-image bg-white dark:bg-background/10 md:w-full crosshair-minus'
      }
    >
      {children}
    </div>
  );
};
