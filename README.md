# Nginx SSI Development Environment

## Start nginx

```
cd ~/nginx-ssi-dev-environment
make run-nginx
```

On any file changes, simply restart the container (`cmd+c` and `make run-nginx` again).

## Debugging

In another shell you can follow debug messages:

```
cd ~/nginx-ssi-dev-environment
make debug
```

## Testing

In another shell you can test the current configuration:

```
cd ~/nginx-ssi-dev-environment
make test
```

### Test Expectations

Here an onelinter to check your test expectations:

```
cd ~/nginx-ssi-dev-environment
TEST_CASES_TO_MATCH=8 result=$(make test | grep 'Test OK' | wc -l | tr -d " "); if [ "$result" -eq $TEST_CASES_TO_MATCH ]; then echo "Test count OK"; else echo "Test count not expected\!"; fi
```

## Nginx Docs

- https://www.nginx.com/resources/wiki/start/topics/depth/ifisevil/
- https://www.nginx.com/resources/wiki/start/topics/tutorials/config_pitfalls/
- https://www.nginx.com/resources/wiki/start/topics/examples/dynamic_ssi/
- https://nginx.org/en/docs/http/ngx_http_ssi_module.html
