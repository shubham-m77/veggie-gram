import { Link } from 'react-router-dom'
import logo from "../assets/veggiegram.png"
import { footerLinks } from '../assets/images/assets'

const Footer = () => {
  return (
    <div className='text-gray-500/80 pt-8 px-6 md:px-16 lg:px-24 xl:px-32 bg-bg'>
            <div className='flex flex-wrap justify-between gap-12 md:gap-6'>
                <div className='max-w-80'>
<Link to="/" className="flex items-center gap-1.5 text-xl font-extrabold brand-logo">
                <img className="h-7 md:h-8 " src={logo} alt="VeggieGram" />
                <h1 className="text-[18px] md:text-xl">Veggie<span>Gram</span></h1>
            </Link>                    <p className='text-sm mt-2'>
           <span className='font-semibold'>VeggieGram</span>  brings farm-fresh, seasonal produce straight to your door—sourced from trusted local farmers for a clean, sustainable lifestyle.                    </p>
                    
                </div>
                
                {footerLinks.map((ftr,idx)=>(
                    <div key={idx}>
                    <p className='text-lg text-gray-800'>{ftr.title}</p>
                    <ul className='mt-3 flex flex-col gap-2 text-sm'>
                    {ftr.links.map((link)=>(<li><Link className='hover:text-gray-600' to={link.url}>{link.text}</Link></li>))}
                    </ul>
                </div>
))}
                
          </div>
            <hr className='border-gray-300 mt-8' />
            <div className='flex flex-col md:flex-row gap-2 items-center justify-between py-5'>
                <p>© {new Date().getFullYear()} Brand. All rights reserved.</p>
                <ul className='flex items-center gap-4'>
                    <li><a href="#">Privacy</a></li>
                    <li><a href="#">Terms</a></li>
                    <li><a href="#">Sitemap</a></li>
                </ul>
            </div>
        </div>
  )
}

export default Footer
