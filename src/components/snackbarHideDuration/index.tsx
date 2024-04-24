import * as React from 'react'
import { type FC, ReactNode } from 'react'
import Snackbar from '@mui/joy/Snackbar'
import { ColorPaletteProp } from '@mui/joy/styles/types'
import {
  errorLight,
  errorTextLight,
  successLight,
  successTextLight,
} from 'config/styles/colors'
import errorIcon from 'assets/icons/bin.svg'
import successIcon from 'assets/icons/check-success.svg'

export const SnackbarHideDuration: FC<{
  text: ReactNode
  duration: number
  open: boolean
  color: ColorPaletteProp
  vertical: 'top' | 'bottom'
  horizontal: 'left' | 'center' | 'right'
  setOpen: (open: boolean) => void
  onClose?: () => void
}> = ({
  text,
  duration,
  open,
  color,
  vertical,
  horizontal,
  setOpen,
  onClose,
}) => {
  const [left, setLeft] = React.useState<undefined | number>()
  const timer = React.useRef<undefined | number>()

  const countdown = () => {
    timer.current = window.setInterval(() => {
      setLeft((prev) => (prev === undefined ? prev : Math.max(0, prev - 100)))
    }, 100)
  }

  React.useEffect(() => {
    if (open && duration !== undefined && duration > 0) {
      setLeft(duration)
      countdown()
    } else {
      window.clearInterval(timer.current)
    }
  }, [open, duration])

  const handlePause = () => {
    window.clearInterval(timer.current)
  }

  const handleResume = () => {
    countdown()
  }
  return (
    <Snackbar
      sx={{
        backgroundColor: color === 'success' ? successLight : errorLight,
        color: color === 'success' ? successTextLight : errorTextLight,
      }}
      anchorOrigin={{ vertical, horizontal }}
      variant='solid'
      color={color}
      autoHideDuration={duration}
      resumeHideDuration={left}
      onMouseEnter={handlePause}
      onMouseLeave={handleResume}
      onFocus={handlePause}
      onBlur={handleResume}
      onUnmount={() => setLeft(undefined)}
      open={open}
      onClose={() => {
        setOpen(false)
        onClose && onClose()
      }}
    >
      <img src={color === 'success' ? successIcon : errorIcon} alt='Icon' />
      {text}
    </Snackbar>
  )
}

export default SnackbarHideDuration
