# Úpravy Jitsi SDK

## Invite URL

Pro nastavení "invite URL" slouzi metoda `setInviteURL()`.

## Feature flagy

 Nastavení hodnoty se provádi metodou `setFeatureFlag` (jednotné pro obě platformy)

| Flag                   | Typ     | Výchozí hodnota | Popis                                                        |
| ---------------------- | ------- | --------------- | ------------------------------------------------------------ |
| `chat-overlay.enabled` | boolean | `false`         | Povolení/zakázání chatovací vrstvy nad videem                |
| `chat-overlay.limit`   | number  | `4`             | Počet zobrazených zpráv                                      | 
| `tile-view.enabled`    | boolean | `false`          | Povolí/zakáže zobrazovat dlaždice pro více jak dva účastníky |
