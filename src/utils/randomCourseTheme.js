import imageOne from '../img/courses/svgs/newideas-60b6.svg'
import imageTwo from '../img/courses/svgs/tetris-game-60b6.svg'
import imageThree from '../img/courses/svgs/makeupretouch-60b6.svg'
import imageFour from '../img/courses/svgs/internetcats-60b6.svg'
import imageFive from '../img/courses/svgs/skater-60b6.svg'
import imageSix from '../img/courses/svgs/onlinestudying-60b6.svg'
import imageSeven from '../img/courses/svgs/vases-60b6.svg'
import imageEight from '../img/courses/svgs/flyingturtle-60b6.svg'
import imageNine from '../img/courses/svgs/onlinedating-60b6.svg'
import imageTen from '../img/courses/svgs/science-60b6.svg'
import imageEl from '../img/courses/svgs/photosession-60b6.svg'


export const arrayOfCoursesThemes = [
  { 'color': 'neonBlue', 'image': imageOne },
  { 'color': 'neonPurple', 'image': imageTwo },
  { 'color': 'neonOrange', 'image': imageThree },
  { 'color': 'neonGreen', 'image': imageFour },
  { 'color': 'neonBlue', 'image': imageFive },
  { 'color': 'neonPurple', 'image': imageSix },
  { 'color': 'neonBlue', 'image': imageSeven },
  { 'color': 'neonGreen', 'image': imageEight },
  { 'color': 'neonGreen', 'image': imageNine },
  { 'color': 'neonPurple', 'image': imageTen },
  { 'color': 'neonOrange', 'image': imageEl },
]


export default function randomCourseTheme() {


  function rollDice(sides) {
    return Math.floor(Math.random() * sides)
  }

  let { color, image } = arrayOfCoursesThemes[rollDice(arrayOfCoursesThemes.length)]

  return { color, image }
}



// let result = randomCourseTheme(arrayOfCoursesThemes);
// let color = result.color;
// let image = result.image;

// export { color, image };