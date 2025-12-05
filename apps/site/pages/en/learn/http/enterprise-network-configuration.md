---
title: Enterprise Network Configuration
layout: learn
authors: Joyee Cheung
---

# Enterprise Network Configuration

## Overview

Enterprise environments often require applications to operate behind corporate proxies and use custom certificate authorities (CAs) for SSL/TLS validation. Node.js provides built-in support for these requirements through environment variables and command-line flags, eliminating the need for third-party proxy libraries in many cases.

This guide covers how to configure Node.js applications to work in enterprise network environments:

- Configuring proxies via the `NODE_USE_ENV_PROXY` environment variable or the `--use-env-proxy` flag
- Adding certificate authorities from system store via the `NODE_USE_SYSTEM_CA` environment variable or the `--use-system-ca` flag.

## Proxy Configuration

In many enterprise environments, internet access to external services may need to be routed through HTTP/HTTPS proxies for security and monitoring. This requires applications to be aware of and use these proxies when making network requests.

Proxy settings are often provided via environment variables such as `HTTP_PROXY`, `HTTPS_PROXY`, and `NO_PROXY`. Node.js supports these when `NODE_USE_ENV_PROXY` or `--use-env-proxy` is enabled. This works with `node:http` and `node:https` (v22.21.0 or v24.5.0+) methods as well as `fetch()` (v22.21.0 or v24.0.0+).

Example (POSIX shells):

```bash
# The proxy settings might be configured in the system by your IT department
# and shared across different tools.
export HTTP_PROXY=http://proxy.company.com:8080
export HTTPS_PROXY=http://proxy.company.com:8080
export NO_PROXY=localhost,127.0.0.1,.company.com

# To enable it for Node.js applications.
export NODE_USE_ENV_PROXY=1
node app.js
```

Alternatively, enable it via the command-line flag `--use-env-proxy` on Node.js v22.21.0 or v24.5.0 and above:

```bash
# The proxy settings might be configured in the system by your IT department
# and shared across different tools.
export HTTP_PROXY=http://proxy.company.com:8080
export HTTPS_PROXY=http://proxy.company.com:8080
export NO_PROXY=localhost,127.0.0.1,.company.com

# To enable it for Node.js applications.
node --use-env-proxy app.js
```

Or, if `--env-file` is used to load environment variables from a file:

```txt
# In .env file
HTTP_PROXY=http://proxy.company.com:8080
HTTPS_PROXY=http://proxy.company.com:8080
NO_PROXY=localhost,127.0.0.1,.company.com
NODE_USE_ENV_PROXY=1
```

```bash
node --env-file ./.env app.js
```

Once enabled, `http`, `https`, and `fetch()` requests use the configured proxies by default, unless an agent is overridden or the target matches `NO_PROXY`.

### Configure the Proxy Programmatically

To configure the proxy programmatically, override the agents. This is currently supported by `https.request()` and other methods built upon it such as `https.get()`.

To override the agent on a per-request basis, use the `agent` option for `http.request()`/`https.request()` and similar methods:

```cjs
const https = require('node:https');

// Creating a custom agent with custom proxy support.
const agent = new https.Agent({
  proxyEnv: { HTTPS_PROXY: 'http://proxy.company.com:8080' },
});

https.request(
  {
    hostname: 'www.external.com',
    port: 443,
    path: '/',
    agent,
  },
  res => {
    // This request will be proxied through proxy.company.com:8080 using the HTTP protocol.
  }
);
```

```mjs
import https from 'node:https';

// Creating a custom agent with custom proxy support.
const agent = new https.Agent({
  proxyEnv: { HTTPS_PROXY: 'http://proxy.company.com:8080' },
});

https.request(
  {
    hostname: 'www.external.com',
    port: 443,
    path: '/',
    agent,
  },
  res => {
    // This request will be proxied through proxy.company.com:8080 using the HTTP protocol.
  }
);
```

To override the agent globally, reset `http.globalAgent` and `https.globalAgent`:

<!-- TODO(joyeecheung): update this when Node.js has a method that supports global configuration for all requesters -->

**Note**: Global agents do not affect `fetch()`.

```cjs
const http = require('node:http');
const https = require('node:https');

http.globalAgent = new http.Agent({
  proxyEnv: { HTTP_PROXY: 'http://proxy.company.com:8080' },
});
https.globalAgent = new https.Agent({
  proxyEnv: { HTTPS_PROXY: 'http://proxy.company.com:8080' },
});

// Subsequent requests will all use the configured proxies, unless they override the agent option.
http.request('http://external.com', res => {
  /* ... */
});
https.request('https://external.com', res => {
  /* ... */
});
```

```mjs
import http from 'node:http';
import https from 'node:https';

http.globalAgent = new http.Agent({
  proxyEnv: { HTTP_PROXY: 'http://proxy.company.com:8080' },
});
https.globalAgent = new https.Agent({
  proxyEnv: { HTTPS_PROXY: 'http://proxy.company.com:8080' },
});

// Subsequent requests will all use the configured proxies, unless they override the agent option.
http.request('http://external.com', res => {
  /* ... */
});
https.request('https://external.com', res => {
  /* ... */
});
```

### Using Proxies with Authentication

If the proxy requires authentication, include credentials in the proxy URL:

```bash
export HTTPS_PROXY=http://username:password@proxy.company.com:8080
```

**Security Note**: Avoid committing credentials in env files. Prefer a secret manager and programmatic configuration.

### Proxy Bypass Configuration

The `NO_PROXY` variable supports:

- `*` - Bypass proxy for all hosts
- `company.com` - Exact host name match
- `.company.com` - Domain suffix match (matches `sub.company.com`)
- `*.company.com` - Wildcard domain match
- `192.168.1.100` - Exact IP address match
- `192.168.1.1-192.168.1.100` - IP address range
- `company.com:8080` - Hostname with specific port

If a target matches `NO_PROXY`, the request bypasses the proxy.

## Certificate Authority Configuration

By default, Node.js uses Mozilla’s bundled root CAs and does not consult the OS store. In many enterprise environments, internal CAs are installed in the OS store and are expected to be trusted when connecting to internal services; connections to certificates signed by those CAs can fail validation with errors such as:

```
Error: self signed certificate in certificate chain
```

From Node.js v22.15.0, v23.9.0, v24.0.0 and above, Node.js can be configured to trust these custom CAs using the system's certificate store.

### Adding CA Certificates from the System Store

- From environment variable: `NODE_USE_SYSTEM_CA=1 node app.js`
- From command-line flag: `node --use-system-ca app.js`

When enabled, Node.js loads system CAs and uses them in addition to its bundled CAs for TLS validation.

Node.js reads certificates from different locations depending on the platform:

- Windows: Windows Certificate Store (via Windows Crypto API)
- macOS: macOS Keychain
- Linux: OpenSSL defaults, typically via `SSL_CERT_FILE`/`SSL_CERT_DIR`, or paths like `/etc/ssl/cert.pem` and `/etc/ssl/certs/` depending on the OpenSSL build

Node.js follows a policy similar to that of Chromium. See [the Node.js documentation](https://nodejs.org/api/cli.html#--use-system-ca) for more details.

### Adding additional CA Certificates

To add specific CA certificates without relying on the system store:

```bash
export NODE_EXTRA_CA_CERTS=/path/to/company-ca-bundle.pem
node app.js
```

The file should contain one or more PEM-encoded certificates.

#### Combining Options

You can combine `NODE_USE_SYSTEM_CA` with `NODE_EXTRA_CA_CERTS`:

```bash
export NODE_USE_SYSTEM_CA=1
export NODE_EXTRA_CA_CERTS=/path/to/additional-cas.pem
node app.js
```

With both enabled, Node.js trusts bundled CAs, system CAs, and the additional certificates specified by `NODE_EXTRA_CA_CERTS`.

### Configure CA Certificates Programmatically

#### Configure Global CA Certificates

Use [`tls.getCACertificates()`](https://nodejs.org/api/tls.html#tlsgetcacertificatestype) and [`tls.setDefaultCACertificates()`](https://nodejs.org/api/tls.html#tlssetdefaultcacertificatescerts) to configure global CA certificates. For example, to add system certificates into the default store:

```cjs
const https = require('node:https');
const tls = require('node:tls');
const currentCerts = tls.getCACertificates('default');
const systemCerts = tls.getCACertificates('system');
tls.setDefaultCACertificates([...currentCerts, ...systemCerts]);

// Subsequent requests use system certificates during verification.
https.get('https://internal.company.com', res => {
  /* ... */
});
fetch('https://internal.company.com').then(res => {
  /* ... */
});
```

```mjs
import https from 'node:https';
import tls from 'node:tls';
const currentCerts = tls.getCACertificates('default');
const systemCerts = tls.getCACertificates('system');
tls.setDefaultCACertificates([...currentCerts, ...systemCerts]);

// Subsequent requests use system certificates during verification.
https.get('https://internal.company.com', res => {
  /* ... */
});
fetch('https://internal.company.com').then(res => {
  /* ... */
});
```

#### Configure CA Certificates for Individual Requests

To override CA certificates per request, use the `ca` option. This is currently only supported by `tls.connect()`/`https.request()` and methods built upon them such as `https.get()`.

```cjs
const https = require('node:https');
const specialCerts = ['-----BEGIN CERTIFICATE-----\n...'];
https.get(
  {
    hostname: 'internal.company.com',
    port: 443,
    path: '/',
    method: 'GET',
    // The `ca` option replaces defaults; concatenate bundled certs if needed.
    ca: specialCerts,
  },
  res => {
    /* ... */
  }
);
```

```mjs
import https from 'node:https';
const specialCerts = ['-----BEGIN CERTIFICATE-----\n...'];
https.get(
  {
    hostname: 'internal.company.com',
    port: 443,
    path: '/',
    method: 'GET',
    // The `ca` option replaces defaults; concatenate bundled certs if needed.
    ca: specialCerts,
  },
  res => {
    /* ... */
  }
);
```
