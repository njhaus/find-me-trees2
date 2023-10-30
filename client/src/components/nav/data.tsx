import About from "../../pages/about/About"
import Browse from "../../pages/browse/Browse"


interface Links {
    text: string,
    to: string
}

const links = [
    {
        text: 'Find Trees',
        to: '/browse'
    },
    {
        text: "About",
        to: '/about'
    }
]

export default links;