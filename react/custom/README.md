# Úpravy Jitsi SDK

## Invite URL

Pro nastavení "invite URL" slouzi metoda `setInviteURL()`.

## Feature flagy

 Nastavení hodnoty se provádi metodou `setFeatureFlag` (jednotné pro obě platformy)

| Flag                      | Typ     | Výchozí hodnota | Popis                                                        |
| ------------------------- | ------- | --------------- | ------------------------------------------------------------ |
| `chat-overlay.enabled`    | boolean | `true`          | Povolení/zakázání chatovací vrstvy nad videem                |
| `chat-overlay.limit`      | number  | `0`             | Počet zobrazených zpráv (0 = neomezeno)                      | 
| `tile-view.enabled`       | boolean | `false`         | Povolí/zakáže zobrazovat dlaždice pro více jak dva účastníky |
| `private-message.enabled` | boolean | `false`         | Povolení/zakázání odesílání soukromých zpráv                 |

