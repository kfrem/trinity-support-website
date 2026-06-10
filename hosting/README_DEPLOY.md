# Hostinger deployment

Upload the contents of this `site` folder to the document root for:

`trinitysupport.finaccord.pro`

Recommended Hostinger setup:

1. In hPanel, create subdomain `trinitysupport` under `finaccord.pro`.
2. Set the subdomain document root to this uploaded `site` folder, or upload these files into the subdomain's `public_html` folder.
3. Enable SSL for `trinitysupport.finaccord.pro`.
4. Confirm these URLs work:
   - `https://trinitysupport.finaccord.pro/`
   - `https://trinitysupport.finaccord.pro/documents/library.json`
   - `https://trinitysupport.finaccord.pro/downloads/Trinity-Support-Service-Guide.pdf`
   - `https://trinitysupport.finaccord.pro/downloads/Trinity-Support-Service-Guide.docx`
   - `https://trinitysupport.finaccord.pro/downloads/Trinity-Support-Policy-Manual.docx`

This build is static and does not need Node, PHP or a database.
