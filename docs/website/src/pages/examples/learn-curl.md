### Curl Quick Guide: Core HTTP Request Patterns

Curl is a command-line HTTP tool with broad protocol support. This guide focuses on practical
patterns and assumes **curl 7.87.0+**.

---

#### 1. Request methods

Best practice: use `-X` explicitly for non-GET requests and use `--url-query` for query params.

```bash
# GET
curl --url-query "name=John" --url-query "age=30" https://api.example.com/users

# POST
curl -X POST https://api.example.com/users

# PUT / DELETE
curl -X PUT https://api.example.com/users/123
curl -X DELETE https://api.example.com/users/123
```

---

#### 2. Request headers

Best practice: use `-H` for auth and content type.

```bash
curl -H "Authorization: Bearer TOKEN" \
  -H "X-Custom-Header: value" \
  -H "Content-Type: application/json" \
  https://api.example.com/data
```

---

#### 3. Cookie handling

Best practice: `-b` sends cookies and `-c` stores response cookies.

```bash
# Send cookie
curl -b "sessionid=abc123" https://example.com

# Save and reuse cookies
curl -c cookies.txt https://example.com/login
curl -b cookies.txt https://example.com/dashboard
```

---

#### 4. Request body

Best practice: use `-d` for JSON/form and `-F` for multipart uploads.

```bash
# JSON body
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"name":"John"}' \
  https://api.example.com/users

# URL-encoded form
curl -X POST -d "username=john" -d "password=123" https://api.example.com/login

# Multipart upload
curl -X POST \
  -F "avatar=@photo.jpg" \
  -F "description=Profile image" \
  https://api.example.com/upload
```

---

#### 5. Debugging requests

Best practice: use `-v` for headers and `--trace` for full wire-level logs.

```bash
curl -v https://example.com
curl --trace trace.bin https://example.com
curl --trace-ssl ssl.log https://example.com
```

---

#### 6. Processing responses

Best practice: separate body, headers, and status code when needed.

```bash
# Pretty print JSON (requires jq)
curl https://api.example.com/data | jq .

# Only status code
curl -o /dev/null -s -w "%{http_code}\n" https://example.com

# Save response headers
curl -D headers.txt https://example.com

# Header-only request
curl -I https://example.com
```

---

#### 7. Output control and downloads

Best practice: use `-sS` for CI-friendly output and `-O` / `-J` for file downloads.

```bash
curl -sS https://example.com
curl https://example.com | tee output.html
curl -O https://example.com/files/report.pdf
curl -O -J https://example.com/generate-report
curl -C - -O https://example.com/largefile.zip
```

---

### End-to-end examples

```bash
# Authenticated upload
curl -X POST \
  -H "Authorization: Bearer xyz" \
  -F "metadata=@data.json;type=application/json" \
  -F "image=@photo.jpg" \
  -o response.json \
  -c session.cookie \
  -sS \
  https://api.example.com/upload
```

```bash
# PUT with query parameters and JSON payload
curl -X PUT \
  --url-query "version=2" \
  -H "Content-Type: application/json" \
  -d '{"status":"active"}' \
  https://api.example.com/users/123?debug=true
```

## References

- [curl manual](https://curl.se/docs/manpage.html)
