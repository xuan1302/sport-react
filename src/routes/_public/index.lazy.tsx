import { createLazyFileRoute } from '@tanstack/react-router';

import { Divider, Image } from 'antd';
import heroBannerImage from '../../assets/hero-banner.png';
import section1 from '../../assets/section-1.png';
import section2 from '../../assets/section-2.png';
import section3 from '../../assets/section-3.png';
import section4 from '../../assets/section-4.png';

import productExample from '../../assets/product-example.png';
import termBanner from '../../assets/term-banner.png';

export const Route = createLazyFileRoute('/_public/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className='flex flex-col'>
      <div className=''>
        <Image src={heroBannerImage} preview={false} />
      </div>

      <div className='max-w-[1200px] mx-auto w-full'>
        <div className='mt-[50px] grid grid-cols-4 gap-4 w-full'>
          <div className='w-[280px]'>
            <Image src={section1} preview={true} />
          </div>
          <div className='w-[280px]'>
            <Image src={section2} preview={true} />
          </div>
          <div className='w-[280px]'>
            <Image src={section3} preview={true} />
          </div>
          <div className='w-[280px]'>
            <Image src={section4} preview={true} />
          </div>
        </div>

        <Divider className='py-5'>
          <p>Đồ thể thao nam</p>
        </Divider>

        <div className='grid grid-cols-4 gap-x-2 gap-y-4'>
          {new Array(8).fill(0).map((_, index) => (
            <div key={index} className='w-[280px]'>
              <Image src={productExample} preview={false} />

              <p className='text-[#262626] text-[11px] uppercase'>
                Áo thể thao nam
              </p>

              <p className='text-[#105458] hover:underline cursor-pointer'>
                Quần chạy bộ Dài Nam MS277
              </p>

              <p className='font-semibold'>299.000₫</p>
            </div>
          ))}
        </div>

        <Divider className='py-5'>
          <p>Đồ thể thao nữ</p>
        </Divider>

        <div className='grid grid-cols-4 gap-x-2 gap-y-4'>
          {new Array(8).fill(0).map((_, index) => (
            <div key={index} className='w-[280px]'>
              <Image src={productExample} preview={false} />

              <p className='text-[#262626] text-[11px] uppercase'>
                Áo thể thao nam
              </p>

              <p className='text-[#105458] hover:underline cursor-pointer'>
                Quần chạy bộ Dài Nam MS277
              </p>

              <p className='font-semibold'>299.000₫</p>
            </div>
          ))}
        </div>

        <Divider className='py-5'>
          <p>Gel năng lượng</p>
        </Divider>

        <div className='grid grid-cols-4 gap-x-2 gap-y-4'>
          {new Array(8).fill(0).map((_, index) => (
            <div key={index} className='w-[280px]'>
              <Image src={productExample} preview={false} />

              <p className='text-[#262626] text-[11px] uppercase'>
                Áo thể thao nam
              </p>

              <p className='text-[#105458] hover:underline cursor-pointer'>
                Quần chạy bộ Dài Nam MS277
              </p>

              <p className='font-semibold'>299.000₫</p>
            </div>
          ))}
        </div>

        <Divider className='py-5'>
          <p>Phụ kiện thể thao</p>
        </Divider>

        <div className='grid grid-cols-4 gap-x-2 gap-y-4'>
          {new Array(8).fill(0).map((_, index) => (
            <div key={index} className='w-[280px]'>
              <Image src={productExample} preview={false} />

              <p className='text-[#262626] text-[11px] uppercase'>
                Áo thể thao nam
              </p>

              <p className='text-[#105458] hover:underline cursor-pointer'>
                Quần chạy bộ Dài Nam MS277
              </p>

              <p className='font-semibold'>299.000₫</p>
            </div>
          ))}
        </div>

        <div className='mt-[50px]'>
          <Image src={termBanner} preview={false} />
        </div>

        <Divider className='py-5'>
          <p>Blog thể thao</p>
        </Divider>
      </div>
    </div>
  );
}
