
# https://gist.github.com/apolloclark/2d4f6362f31666c1c81f

echo "test";

#https://api.twitter.com/1.1/users/search.json'?oauth_version=1.0&oauth_nonce=f29765d6b55edbcc9a96868984eeb8db&oauth_timestamp=1490938401&oauth_consumer_key=d4SMCaA2L8K0r0ZwwwBojPEAi&q=google&page=1&count=3&oauth_signature_method=HMAC-SHA1&oauth_signature=26r1qinxLJL65qDJePe4jqdF%2Bng%3D

curl \
--get 'https://api.twitter.com/1.1/users/search.json' \
--data '&q=google&page=1&count=3' \
--header 'Authorization: OAuth oauth_consumer_key="d4SMCaA2L8K0r0ZwwwBojPEAi", oauth_nonce="1d2a124dd8b9427bafdeba554cd6cab5", oauth_signature="Db5eYY2m/Hs7gLBLdF94HPhI0Ow=", oauth_signature_method="HMAC-SHA1", oauth_timestamp="1490939037", oauth_token="WdTA9baw5hl2mGljrYOpCiTYiJK94smRQBm6GhDHed", oauth_version="1.0"'
