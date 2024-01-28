async function getCookieValueByName(name){
    const cookies = document.cookie;
    const cookieArray = cookies.split(';').map(cookie => cookie.trim());
    const desiredCookie = cookieArray.find(cookie => cookie.startsWith(`${name}=`));

    if (desiredCookie) {
      const [, value] = desiredCookie.split('=');
      console.log(`Cookie Value for '${name}': ${value}`);
      return value;
    } else {
      console.log(`Cookie with name '${name}' not found`);
      return null;
    }
  };

export default getCookieValueByName;