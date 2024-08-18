import { Button } from "@/components/ui/button";

export default function GoogleSignInButton() {
  return (
    <Button
      className="bg-white text-black hover:bg-gray-100 hover:text-black"
      variant="outline"
      asChild
    >
      <a href="login/github" className="flex w-full items-center gap-2">
        <GoogleIcon /> Sign in with Github
      </a>
    </Button>
  );
}

function GoogleIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="23"
      height="23"
      viewBox="0 0 16 16"
    >
      <path
        fill="#b6c9d6"
        d="M15.404,8.127c0,4.164-3.393,7.48-7.48,7.48s-7.48-3.316-7.48-7.48s3.316-7.48,7.48-7.48 S15.404,3.962,15.404,8.127z"
      ></path>
      <path
        fill="#fff"
        d="M12.773,8.071c0,0.836-0.432,1.997-1.141,2.574c-0.573,0.467-1.331,0.614-2.187,0.661 c0.322,0.195,0.536,0.549,0.536,0.953v2.767c-0.54,0.134-1.102,0.207-1.68,0.207c-0.573,0-1.133-0.071-1.669-0.205V13.21 c-0.233,0.073-0.538,0.115-0.93,0.095c-1.303-0.069-1.489-0.86-1.697-1.418c-0.21-0.558-0.862-0.629-0.769-0.86 c0.45-0.154,0.803-0.007,1.042,0.175c0.19,0.144,0.322,0.348,0.41,0.569c0.101,0.253,0.37,0.674,1.037,0.674 c0.471,0,0.75-0.11,0.91-0.218c0.009-0.395,0.225-0.737,0.542-0.925c-0.908-0.058-1.705-0.229-2.291-0.739 C4.233,9.998,3.841,8.868,3.841,8.071c0-0.664,0.274-1.483,0.743-1.999C4.598,6.058,4.611,6.041,4.63,6.026 C4.522,5.702,4.397,5.062,4.7,4.279c0.903-0.017,1.615,0.476,1.906,0.715c0.525-0.121,1.098-0.179,1.701-0.179 c0.618,0,1.208,0.054,1.742,0.179c0.29-0.238,1.005-0.731,1.906-0.713c0.316,0.815,0.169,1.476,0.06,1.785 C12.494,6.618,12.773,7.401,12.773,8.071z"
      ></path>
      <path
        fill="#788b9c"
        d="M8.015,16.029C3.595,16.029,0,12.434,0,8.015C0,3.52,3.52,0,8.015,0s8.015,3.52,8.015,8.015 C16.029,12.434,12.434,16.029,8.015,16.029z M8.015,1.069c-3.895,0-6.946,3.051-6.946,6.946c0,3.83,3.116,6.946,6.946,6.946 s6.946-3.116,6.946-6.946C14.961,4.12,11.91,1.069,8.015,1.069z"
      ></path>
    </svg>
  );
}
