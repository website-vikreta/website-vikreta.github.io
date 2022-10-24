export const pageAnimation = {
   hidden: {
      opacity: 0,
      y: 300,
   },
   show: {
      opacity: 1,
      y: 0,
      transition: {
         duration: 0,
         when: "beforeChildren",
         staggerChildren: 0.5,
      },
   },
   exit: {
      opacity: 0,
      transition: {
         duration: 0.25,
      },
   }
}

export const fadeParent = {
   hidden: {
      opacity: 1,
   },
   show: {
      opacity: 1,
      transition: {
         staggerChildren: 0.35,
         ease: "easeOut"
      }
   }
}

export const fade = {
   hidden: {
      opacity: 0,
      y: 50
   },
   show: {
      opacity: 1,
      y: 0,
      transition: {
         duration: 0.75,
         ease: "easeOut"
      }
   },
}
export const smoothFade = {
   hidden: {
      opacity: 0,
   },
   show: {
      opacity: 1,
      transition: {
         duration: 1,
         ease: "easeOut"
      }
   },
}
export const fadeDelay = {
   hidden: {
      opacity: 0,
      y: 50
   },
   show: {
      opacity: 1,
      y: 0,
      transition: {
         duration: 0.75,
         ease: "easeOut",
         delay: 2
      }
   },
}
export const slideRight = {
   hidden: {
      x: "0%"
   },
   show: {
      x: "100%",
      transition: {
         duration: 2,
         ease: "easeOut",
         delay: 3
      }
   },
}

export const frameAnimation = {
   hidden: {
      x: "-130%",
      skew: "-30deg",
   },
   show: {
      x: "150%",
      transition: {
         duration: 1,
         ease: "easeOut"
      }
   }
}

export const frameParent = {
   hidden: {
      opacity: 1,
   },
   show: {
      opacity: 1,
      transition: {
         staggerChildren: 0.1,
         ease: "easeOut"
      }
   }
}


// Hero Animations
export const titleAnim = {
   hidden: {
      y: 200
   },
   show: {
      y: 0,
      transition: {
         duration: 0.75,
         ease: "easeOut"
      }
   }
}

export const heroAnimation = {
   hidden: {
      opacity: 0,
      y: 100
   },
   show: {
      opacity: 1,
      y: 0,
      transition: {
         duration: 1,
         ease: "easeOut",
         when: "afterParent"
      }
   }
}

export const heroParent = {
   hidden: {
      opacity: 0,
      y: 100
   },
   show: {
      opacity: 1,
      y: 0,
      transition: {
         when: "beforeChildren",
         staggerChildren: 0.5,
         ease: "easeOut"
      }
   }
}


export const frameAnimationVert = {
   hidden: {
      y: "-100%",
   },
   show: {
      y: "100%",
      transition: {
         duration: 0.75,
         ease: "easeOut"
      }
   }
}

export const frameParentVert = {
   hidden: {
      opacity: 1,
   },
   show: {
      opacity: 1,
      transition: {
         staggerChildren: 0.1,
         ease: "easeOut"
      }
   },
   exit: {
      opacity: 0,
      y: "100%",
      transition: {
         duration: 0.25,
      },
   }
}
export const frameAnimationIvert = {
   hidden: {
      y: "100%",
   },
   show: {
      y: "-100%",
      transition: {
         duration: 0.75,
         ease: "easeOut"
      }
   }
}

export const frameParentIvert = {
   hidden: {
      opacity: 1,
   },
   show: {
      opacity: 1,
      transition: {
         staggerChildren: 0.1,
         ease: "easeOut"
      }
   },
   exit: {
      opacity: 0,
      y: "100%",
      transition: {
         duration: 0.25,
      },
   }
}