# NOAA SSD Bulletin Parser

This package is able to parse bulletins from the NOAA SSD Bulletin Page
https://www.ssd.noaa.gov/PS/TROP/bulletins.html

## Install dependencies

```bash
npm install
```

## Usage

```javascript
import { parseBulletin } from 'noaa-bulletin-parser';
var bulletinObj = parseBulletin('Bulletin Text');
```