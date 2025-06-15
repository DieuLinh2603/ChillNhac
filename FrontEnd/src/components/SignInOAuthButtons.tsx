import { useSignIn } from "@clerk/clerk-react"
import { Button } from "./ui/button";


const SignInOAuthButtons = () => {
const {signIn, isLoaded} = useSignIn();

if(!isLoaded){
    return null;
}

const handleSignInWithGoogle = () => {
    signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        //sau khi đăng nhập (xác thực bởi GG)
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/auth-callback"
    })
}
  return <Button onClick={handleSignInWithGoogle} variant={"ghost"} className="w-full text-white border-zinc-200 h-11">
    Tiếp tục với Google
    <img className="size-5" src="./../../public/logo-gg.png"/>
  </Button>
}

export default SignInOAuthButtons