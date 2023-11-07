/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "i.simpalsmedia.com",
                port: '',
                pathname: "**"
            }
        ]
            
        
    }
}
//https://i.simpalsmedia.com/point.md/news/370x194/0584edc974553dbc102f0e5549dd0c44.jpg

module.exports = nextConfig
