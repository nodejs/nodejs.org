# ஒவ்வொரு இயக்க முறைமைக்கும் Docker-ரில் குறிப்பிட்ட நிறுவல் வழிமுறைகள் உள்ளன.
# தயவுசெய்து அதிகாரப்பூர்வ ஆவணத்தை https://docker.com/get-started/ இல் பார்க்கவும்

# Node.js Docker படத்தை இழுக்கவும்:
docker pull node:${props.release.major}-${props.release.major >= 4 ? 'alpine' : 'slim'}

# ஒரு Node.js container ஐ உருவாக்கி, ஒரு ஷெல் அமர்வைத் தொடங்கவும்:
docker run -it --rm --entrypoint sh node:${props.release.major}-${props.release.major >= 4 ? 'alpine' : 'slim'}
