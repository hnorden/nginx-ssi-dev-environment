run-find:
	docker run --publish 8080:8080/tcp \
	--volume=`pwd`/web/dashboard-frontend:/var/www/dashboard-frontend:ro \
	--volume=`pwd`/web/frame-frontend:/var/www/frame-frontend:ro \
	--volume=`pwd`/nginx/conf.d/server.conf:/etc/nginx/conf.d/server.conf:ro \
	--volume=`pwd`/nginx/conf.d/web:/etc/nginx/conf.d/web:ro \
	-ti --rm --name nginx-ssi nginx \
	bash -c "find /var/www && echo \"\" && find /etc/nginx && nginx -T"
run-nginx:
	docker run --publish 8080:8080/tcp \
	--volume=`pwd`/web/dashboard-frontend:/var/www/dashboard-frontend:ro \
	--volume=`pwd`/web/frame-frontend:/var/www/frame-frontend:ro \
	--volume=`pwd`/nginx/conf.d/server.conf:/etc/nginx/conf.d/server.conf:ro \
	--volume=`pwd`/nginx/conf.d/web:/etc/nginx/conf.d/web:ro \
	-ti --rm --name nginx-ssi nginx \
	nginx-debug -g 'daemon off;'
test:
	curl http://localhost:8080/dashboard > ~/Downloads/response_no_slash.html
	curl http://localhost:8080/dashboard/ > ~/Downloads/response_slash.html
	curl http://localhost:8080/dashboard/asdf > ~/Downloads/response_slash_uri.html
	curl http://localhost:8080/frame > ~/Downloads/response_frame.html
	if grep 'header partial' web/frame-frontend/dist/frame/header.html; then echo "Setup OK"; else echo "Setup Fehler\!"; fi
	if grep 'footer partial' web/frame-frontend/dist/frame/footer.html; then echo "Setup OK"; else echo "Setup Fehler\!"; fi
	if grep 'value="with a SSI test value"' web/frame-frontend/dist/frame/index.html; then echo "Setup OK"; else echo "Setup Fehler\!"; fi
	if grep 'header partial' ~/Downloads/response_no_slash.html; then echo "Test OK"; else echo "Test Fehler\!"; fi
	if grep 'footer partial' ~/Downloads/response_no_slash.html; then echo "Test OK"; else echo "Test Fehler\!"; fi
	if ! grep 'value="with a SSI test value"' ~/Downloads/response_frame.html; then echo "Test OK"; else echo "Test Fehler\!"; fi
	if grep 'with a SSI test value' ~/Downloads/response_frame.html; then echo "Test OK"; else echo "Test Fehler\!"; fi
	diff ~/Downloads/response_no_slash.html ~/Downloads/response_slash.html
	diff ~/Downloads/response_no_slash.html ~/Downloads/response_slash_uri.html
debug:
	docker exec -ti nginx-ssi tail -f /var/log/nginx/debug.log
debug-if-file-exists:
	# if (-f /var/www/...)
	docker exec -ti nginx-ssi tail -f /var/log/nginx/debug.log | grep --text -A1 'http script file op 0000000000000000'
code-prettier:
	npx prettier --single-quote --print-width 120 --write **/**.html **/**.js **/**.css
